import { ResponsiveContext, RichText, useResponsiveValue } from '@tjclifton/storyblok-react-utils';
import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { Grid, Menu, Ref, Sticky } from 'semantic-ui-react';
import { StoryblokComponent } from 'storyblok-js-client';
import { DocumentSection, DocumentSectionComponent } from './document/Section';

import styles from '@styles/components/storyblok/Document.module.sass';

/**
 *
 */
export type DocumentComponent = StoryblokComponent<'document'> & {
  readonly sections: readonly DocumentSectionComponent[];
};

/**
 *
 */
export interface DocumentProps {
  readonly blok: DocumentComponent;
}

/**
 *
 * @param props
 * @returns
 */
export const Document: React.FC<DocumentProps> = props => {
  const [ activeSection, setActiveSection ] = useState(props.blok.sections[0]);
  const [ selectedSection, setSelectedSection ] = useState<DocumentSectionComponent>();

  const sticky = useResponsiveValue({
    above: 'sm'
  }, true, false);

  console.log(`sticky: ${sticky}`);

  const context = useRef<HTMLElement>(null);

  /**
   *
   */
  const ResponsiveStickyMenu = useCallback((props: { children: ReactNode }) =>
    sticky
      ? <Sticky context={context} offset={100}>{props.children}</Sticky>
      : <div>{props.children}</div>
  , [sticky, context]);

  return <Ref innerRef={context}>
    <Grid>
      <Grid.Column mobile={16} tablet={6} computer={4} className={styles.menu}>
        <ResponsiveStickyMenu>
          <Menu
            secondary
            vertical
            pointing
            fluid
          >
            {props.blok.sections.map(blok =>
              <Menu.Item
                className="hoeflertext-regular"
                key={blok._uid}
                active={activeSection === blok}
                onClick={() => { setSelectedSection(blok); }}
              >
                <RichText text={blok.title} />
              </Menu.Item>
            )}
          </Menu>
        </ResponsiveStickyMenu>
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={10}>
        <div className={styles.sections}>
          {props.blok.sections.map(blok =>
            <DocumentSection
              key={blok._uid}
              blok={blok}
              scrollIntoView={selectedSection === blok}
              onActive={setActiveSection}
            />
          )}
        </div>
      </Grid.Column>
    </Grid>
  </Ref>;
};
