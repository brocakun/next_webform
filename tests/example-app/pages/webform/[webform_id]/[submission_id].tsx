import * as React from 'react';
import { resolveWebformSubmission, Webform } from 'nextjs-drupal-webform';
import { GetStaticPathsContext } from 'next/types';
import { GetStaticPathsResult } from 'next';
import { useRouter } from 'next/router';
import { drupal } from '../../../lib/drupal';

export default function WebformSlug({ webform, id, sid }) {
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
      <h1>{webform?.title}</h1>
      <Webform
        id={id}
        sid={sid}
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
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const webform = await resolveWebformSubmission(
    context.params.webform_id,
    context.params.submission_id,
    drupal,
    { withAuth: true },
  );

  return {
    props: {
      webform,
      id: context.params.webform_id,
      sid: context.params.submission_id,
    },
    revalidate: 1,
  };
}
