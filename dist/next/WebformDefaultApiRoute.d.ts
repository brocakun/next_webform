import { NextApiRequest, NextApiResponse } from 'next';
import { DrupalClient } from 'next-drupal';
export declare function WebformDefaultApiRoute(request: NextApiRequest, response: NextApiResponse, drupal: DrupalClient): Promise<void | NextApiResponse<any>>;
