import { DrupalClient } from 'next-drupal';
import fs from 'fs';
import path from 'path';

const mockPath = path.join(process.cwd(), 'json');

export const drupal = new DrupalClient('http://localhost', {
  fetcher: (url) => {
    const createResponse = (body) => {
      return Promise.resolve(new Response(body, { status: 200 }));
    };
    switch (url) {
      case 'http://localhost/jsonapi':
        return createResponse(
          fs.readFileSync(path.resolve(`${mockPath}/jsonapi.json`)),
        );
      case 'http://localhost/jsonapi/webform/webform':
        return createResponse(
          fs.readFileSync(path.resolve(`${mockPath}/webform.json`)),
        );
      case 'http://localhost/webform/default_test_form?_format=json':
        return createResponse(
          fs.readFileSync(path.resolve(`${mockPath}/webform-rest.json`)),
        );
      case 'http://localhost/webform_rest/default_test_form/elements?_format=json':
        return createResponse(
          fs.readFileSync(
            path.resolve(`${mockPath}/webform-rest-elements.json`),
          ),
        );
      case 'http://localhost/webform_rest/default_test_form/autocomplete_options/employment_status?_format=json':
        return createResponse(
          fs.readFileSync(
            path.resolve(
              `${mockPath}/webform-employment-autocomplete-options.json`,
            ),
          ),
        );
      case 'http://localhost/webform_rest/submit?_format=json':
        return createResponse('');
      default:
        throw new Error(`Unhandled request for URL: ${url}`);
    }
  },
});
