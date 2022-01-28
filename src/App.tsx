import React, { Suspense, useContext, useEffect, useState } from 'react';

import Burden from './components/storyblok/Burden';
import { Video } from './components/storyblok/Video';
import { Document } from './components/storyblok/Document';

import { ComponentLookupContext, StoryRouter, MobileLayout, NavigationItem, ParagraphBlok, useStoryblokNavigationTree, DynamicComponent, SidebarContext } from '@tjclifton/storyblok-react-utils';
import { Button, Grid, Header, List, SemanticVERTICALALIGNMENTS } from 'semantic-ui-react';
import { StoryData } from 'storyblok-js-client';
import Fade from 'react-reveal/Fade';

import { useCallback } from 'react';
import { Page } from './components/storyblok/Page';

import 'animate.css';
import '@styles/LandingPage.scss';

import styles from '@styles/App.module.sass';
import { DocumentSection } from './components/storyblok/document/Section';
import { Blockquote } from './components/storyblok/Blockquote';

/**
 *
 */
declare const window: {
  FB?: {
    CustomerChat?: {
      hide(): void;
    }
  }
};

/**
 *
 */
interface ContentProps {
  readonly navItems: ReadonlyArray<NavigationItem>;
}

/**
 *
 * @param props
 */
const Content: React.FC<ContentProps> = props => {
  const [ scrolled, setScrolled ] = useState(false);

  const { setVisible: setSidebarVisible } = useContext(SidebarContext);

  useEffect(() => {
    document.addEventListener('scroll', () => setScrolled(true));
  }, []);

  const onContentChange = useCallback((content?: StoryData<unknown>) => {
    if (content?.full_slug !== 'contact') window.FB?.CustomerChat?.hide();
  }, []);

  return <StoryRouter
    storyType="page"
    contentFields={{
      content: {
        headerImage: {
          filename: 'include'
        },
        headerText: [{}] as ParagraphBlok[] | null,
        headerTextReveal: 'include' as string | null,
        headerTextVerticalAlignment: 'include' as SemanticVERTICALALIGNMENTS | null
      }
    }}
    wrapperClasses={[styles.wrapper]}
    notFoundSlug="not-found"
    onStoryChange={onContentChange}
    loaderColor={'brown'}
  >
    {data =>
      <div className="container-center-horizontal hoeflertext-regular-normal-storm-dust-16px">
        <div className="landing-page-desktop screen">
          <div className="main-header">
            <Button
              className={styles.menuButton}
              inverted
              icon="bars"
              basic
              size="huge"
              onClick={() => setSidebarVisible(true)}
            />
            <div className="logo bp1-animate-enter3">
              <div className="overlap-group">
                <img
                  className="x0-b070-e27-a3-fd-433"
                  src="https://anima-uploads.s3.amazonaws.com/projects/61bd46e322a5e9aef7486f8e/releases/61efb0d4dd0b21a3ff5d44ca/img/0b070e27-a3fd-433b-b241-10713092c809@1x.png"
                />
                <div className="exposed captureit-regular-normal-well-read-71px">EXPOSED</div>
              </div>
            </div>
            <div className={styles.banner}>
              <div className="sblhebrew-regular-normal-storm-dust-224px">
                <Fade delay={500} duration={1000} when={scrolled}>
                  <div className="bp1-animate-enter4" style={{color: 'var(--well-read)'}}>יְהֹוָה</div>
                </Fade>
                <div style={{top: '-23px'}}>יהוה</div>
              </div>
            </div>
          </div>
          <div className="overlap-group2">
            <div className="flourish"></div>
            <Suspense fallback={null}>
              <DynamicComponent blok={data.content} />
            </Suspense>
          </div>
          <footer>
            <Grid>
              <Grid.Column mobile={16} tablet={6} computer={6}>
                <Header size="small" className="hoeflertext-regular-normal-storm-dust-16px">Affiliated Websites</Header>
                <List link>
                  <List.Item as="a" href="http://thechurchofwells.com">The Church of Wells</List.Item>
                  <List.Item as="a" href="https://follyinisrael.com">Folly in Israel</List.Item>
                  <List.Item as="a" href="https://confessionsoffaithinjesuschrist.com">Confessions of Faith in Jesus Christ</List.Item>
                  <List.Item as="a" href="https://therevelationofjesuschrist.org">The Revelation of Jesus Christ</List.Item>
                  <List.Item as="a" href="https://yearsofancienttimes.com">Years of Ancient Times</List.Item>
                  <List.Item as="a" href="https://hymnsofthelastdays.com">Hymns of the Last Days</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column tablet={4} computer={4} verticalAlign="bottom" textAlign="center">
                Copyright &copy; 2022 The Church of Wells
              </Grid.Column>
              <Grid.Column tablet={6} computer={6}>

              </Grid.Column>
            </Grid>
          </footer>
        </div>
      </div>
    }
  </StoryRouter>;
};

/**
 *
 * @param props
 * @returns
 */
export const App: React.FC = props => {
  const { links } = useStoryblokNavigationTree();

  return <MobileLayout navItems={links || []} direction="right">
    <ComponentLookupContext.Provider value={{
      Burden,
      Video,
      Page,
      Document,
      DocumentSection,
      Blockquote
    }}>
      <Content navItems={links || []} />
    </ComponentLookupContext.Provider>
  </MobileLayout>;
};
