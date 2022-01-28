import React from 'react';
import { Link, RichText } from '@tjclifton/storyblok-react-utils';
import { Richtext, StoryblokComponent } from 'storyblok-js-client';

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
  <figure>
    <blockquote>
      <RichText text={props.blok.text} />
    </blockquote>
    <br />
    <figcaption>
      &mdash;&nbsp;&nbsp;<div style={{display: 'inline-block'}}><RichText text={props.blok.source} /></div>
    </figcaption>
  </figure>;
