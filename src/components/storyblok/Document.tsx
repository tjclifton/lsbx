import { RichText } from '@tjclifton/storyblok-react-utils';
import React, { useRef, useState } from 'react';
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

  const context = useRef<HTMLElement>(null);

  return <Ref innerRef={context}>
    <Grid>
      <Grid.Column width={4} className={styles.menu}>
        <Sticky context={context} offset={100}>
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
        </Sticky>
      </Grid.Column>
      <Grid.Column width={10}>
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
