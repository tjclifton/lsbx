import { DynamicComponent, RichText } from '@tjclifton/storyblok-react-utils';
import React, { useEffect, useRef, useState } from 'react';
import { Header, Visibility } from 'semantic-ui-react';
import { Richtext, StoryblokComponent } from 'storyblok-js-client';
import Reveal from 'react-reveal/Reveal';

import styles from '@styles/components/storyblok/document/Section.module.sass';
import SbEditable from 'storyblok-react';

/**
 *
 */
export type DocumentSectionComponent = StoryblokComponent<'document/section'> & {
  readonly title: Richtext;
  readonly content: readonly StoryblokComponent<string>[];
  readonly subtitle?: Richtext;
  readonly animation?: string;
};

/**
 *
 */
export interface DocumentSectionProps {
  readonly blok: DocumentSectionComponent;
  readonly scrollIntoView?: boolean;
  readonly onActive?: (blok: DocumentSectionComponent) => void;
}

/**
 *
 * @param props
 */
export const DocumentSection: React.FC<DocumentSectionProps> = props => {
  const [ element, setElement ] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!props.scrollIntoView || !element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }, [element, props.scrollIntoView]);

  return <SbEditable content={props.blok}>
    <Reveal
      innerRef={setElement}
      effect={`animate__${props.blok.animation}`}
      duration={1000}
      force={!props.blok.animation}
    >
      <div className={styles.wrapper}>
        <Visibility
          id={props.blok._uid}
          once={false}
          onTopPassed={() => props.onActive?.(props.blok)}
          onBottomPassedReverse={() => props.onActive?.(props.blok)}
        >
          <Header
            className="hoeflertext-regular-normal-metallic-sunburst-32px"
            subheader={props.blok.subtitle
              ? <RichText text={props.blok.subtitle} />
              : null
            }>
            <RichText text={props.blok.title} />
          </Header>
          <div className="hoeflertext-regular-normal-storm-dust-16px">
            {props.blok.content.map(blok =>
              <DynamicComponent key={blok._uid} blok={blok} />
            )}
          </div>
        </Visibility>
    </div>
    </Reveal>
  </SbEditable>;
};
