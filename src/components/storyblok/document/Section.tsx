import { DynamicComponent, RichText } from '@tjclifton/storyblok-react-utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const [ revealFraction, setRevealFraction ] = useState(0.2);

  useEffect(() => {
    if (!props.scrollIntoView || !element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }, [element, props.scrollIntoView]);

  /**
   * Need to handle a dynamically set fraction for sections that are large
   * enough where the default fraction for the reveal (20%) is greater than
   * the screen size, making it so `fraction` of the section never comes into
   * the viewport. We need to adjust for this! The Lord told me He would give
   * this to me for His Name's sake. Help O Jehovah!!
   */
  const onTopVisible = useCallback(() => {
    if (!element) return;

    const { height } = element.getBoundingClientRect();

    setRevealFraction(Math.min(window.innerHeight / height * 0.75, 0.2));
  }, [props.blok, props.onActive, element]);

  return <SbEditable content={props.blok}>
    <Reveal
      innerRef={setElement}
      effect={`animate__${props.blok.animation}`}
      duration={1000}
      force={!props.blok.animation}
      fraction={revealFraction}
    >
      <div className={styles.wrapper}>
        <Visibility
          id={props.blok._uid}
          once={false}
          onTopVisible={onTopVisible}
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
