import React from 'react';
import { Link, RichText } from '@tjclifton/storyblok-react-utils';
import { Richtext, StoryblokComponent } from 'storyblok-js-client';

import styles from '@styles/components/storyblok/Blockquote.module.sass';

/**
 *
 */
export type BlockquoteComponent = StoryblokComponent<'blockquote'> & {
  readonly text: Richtext;
  readonly source: Richtext;
};

/**
 *
 */
export interface BlockquoteProps {
  readonly blok: BlockquoteComponent;
}

/**
 *
 * @param props
 * @returns
 */
export const Blockquote: React.FC<BlockquoteProps> = props =>
  <figure className={styles.wrapper}>
    <blockquote>
      <RichText text={props.blok.text} />
    </blockquote>
    <br />
    <figcaption>
      &mdash; <RichText text={props.blok.source} />
    </figcaption>
  </figure>;
