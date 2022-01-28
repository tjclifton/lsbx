import React, { Suspense } from 'react';
import { EmbeddedVideo, VideoArticlePropTypes } from '@tjclifton/storyblok-react-utils';
import { Loader, Segment } from 'semantic-ui-react';
import classNames from 'classnames';

import styles from '@styles/components/storyblok/Video.module.sass';

/**
 *
 * @param props
 * @returns
 */
export const Video: React.FC<VideoArticlePropTypes> = props =>
  <Segment
    className={classNames(
      'fitted',
      'video',
      'wrapper',
    )}>
    <Suspense fallback={<Loader />}>
      <EmbeddedVideo
        poster={props.blok.poster}
        provider={props.blok.provider}
        url={props.blok.source.cached_url}
      />
    </Suspense>
  </Segment>;

