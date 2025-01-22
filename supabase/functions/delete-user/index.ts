// @ts-ignore
serve(async req => {
  try {
    const {userId} = await req.json();

    // @ts-ignore
    const supabaseAdmin = createClient(
      // @ts-ignore
      Deno.env.get('SUPABASE_URL') ?? '',
      // @ts-ignore
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    const {data, error: deleteError} =
      await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteError) {
      return new Response(
        JSON.stringify({
          error: `Failed to delete auth user: ${deleteError.message}`,
          details: deleteError,
        }),
        {
          status: 400,
          headers: {'Content-Type': 'application/json'},
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data,
      }),
      {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: {'Content-Type': 'application/json'},
      },
    );
  }
});
