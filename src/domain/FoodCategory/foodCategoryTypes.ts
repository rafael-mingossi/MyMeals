import {IconProps} from '@components';

export interface FoodCategoryAPI {
  id: number;
  created_at: string;
  name: string;
  icon_url: string;
  display_order: number;
  description: IconProps['name'];
}

export interface FoodCategory {
  id: number;
  name: string;
  iconUrl: string;
  displayOrder: number;
  createdAt: Date;
  description: IconProps['name'];
}
