import { NextApiRequest, NextApiResponse } from 'next';
import { DrupalClient } from 'next-drupal';

export async function WebformDefaultApiRoute(
  request: NextApiRequest,
  response: NextApiResponse,
  drupal: DrupalClient,
) {
  if (request.method === 'GET') {
    switch (request.query.op.toString()) {
      case 'autocomplete_options': {
        const { id, options_id } = request.query;
        const url = drupal.buildUrl(
          `/webform_rest/${id.toString()}/autocomplete_options/${options_id}?_format=json`,
        );
        const result = await drupal.fetch(url.toString(), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!result.ok) {
          const message = await result.json();
          // Send error to client.
          return response.status(result.status).json({ message });
        }
        response.end(JSON.stringify(await result.json()));
        response.status(200);

        return response;
      }

      default: {
        response.end('{}');
        response.status(404);
        return response;
      }
    }
  } else if (request.method === 'POST') {
    const url = drupal.buildUrl('/webform_rest/submit?_format=json');
    // Submit to Drupal.
    const result = await drupal.fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify(request.body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!result.ok) {
      const message = await result.json();
      // Send error to client.
      return response.status(result.status).json({ message });
    }
    response.end(JSON.stringify(result));
    response.status(200);

    return response;
  }
}
