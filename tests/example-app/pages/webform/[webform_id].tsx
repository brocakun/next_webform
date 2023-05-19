import * as React from 'react';
import { resolveWebformContent, Webform } from 'nextjs-drupal-webform';
import { GetStaticPathsContext } from 'next/types';
import { GetStaticPathsResult } from 'next';
import { useRouter } from 'next/router';
import { drupal } from '../../lib/drupal';

export default function WebformSlug({ webform, id }) {
  const router = useRouter();

  if (router.query) {
    if (router.query.confirmation_type) {
      webform.confirmation.type = router.query.confirmation_type;
    }
    if (router.query.confirmation_url) {
      webform.confirmation.url = router.query.confirmation_url;
    }
    if (router.query.confirmation_message) {
      webform.confirmation.message = router.query.confirmation_message;
    }
  }

  return (
    <div>
      <h1>{webform.title}</h1>
      <Webform
        id={id}
        data={webform}
        className="form-test-class"
        noValidate={true}
      />
    </div>
  );
}

export async function getStaticPaths(
  context: GetStaticPathsContext,
): Promise<GetStaticPathsResult> {
  const entities = await drupal.getResourceCollectionFromContext(
    'webform--webform',
    context,
  );

  const paths = entities.map((entity) => {
    return { params: { webform_id: entity.drupal_internal__id } };
  });
  return {
    paths: [...paths],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const webform = await resolveWebformContent(
    context.params.webform_id,
    drupal,
    { withAuth: true },
  );

  return {
    props: {
      webform,
      id: context.params.webform_id,
    },
    revalidate: 1,
  };
}
