import { PagePropTypes, useStoryblokBreadcrumbs, DynamicComponent, useStoryblokPaths } from '@tjclifton/storyblok-react-utils';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import styles from '@styles/components/storyblok/Page.module.sass';

type StoryblokPageComponentBase = PagePropTypes['blok'];

/**
 *
 */
export interface StoryblokPageComponent extends StoryblokPageComponentBase {
  readonly headerImage?: {
    readonly url?: string;
    readonly filename?: string
  };
}

/**
 *
 * @param props
 * @returns
 */
export const Page: React.FC<PagePropTypes> = props => {
  const breadcrumbs = useStoryblokBreadcrumbs();
  const { pathFor } = useStoryblokPaths();

  /**
   *
   * @returns
   */
   const renderBreadcrumbs = useCallback(() =>
    <div className={styles.breadcrumbs}>
      {breadcrumbs.map((story, i) =>
        i < breadcrumbs.length - 1 ?
          <span key={story.uuid}>
            <Link to={pathFor(story)}>{story.name}</Link>
            <Icon name="chevron right" size="tiny" />
          </span>
        :
          <span key={story.uuid}>{story.name}</span>

      )}
    </div>
  , [breadcrumbs, pathFor]);

  return <div>
    {props.blok.hideBreadcrumbs !== true && renderBreadcrumbs()}
    {props.blok.body?.map(content =>
      <DynamicComponent blok={content} key={content._uid} />
    )}
  </div>;
};
