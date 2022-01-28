import React, { Suspense, useContext, useEffect, useState } from 'react';

import Burden from './components/storyblok/Burden';
import { Video } from './components/storyblok/Video';
import { Document } from './components/storyblok/Document';

import { ComponentLookupContext, StoryRouter, MobileLayout, NavigationItem, ParagraphBlok, useStoryblokNavigationTree, DynamicComponent, SidebarContext, useResponsiveValue, ResponsiveContext } from '@tjclifton/storyblok-react-utils';
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

import logoUrl from '@images/logo.png';

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

  const limitPadding = useResponsiveValue({
    only: 'xs'
  }, true, false);

  const logoWidth = useResponsiveValue({
    above: 'sm'
  }, '20%', '200px');

  console.log(limitPadding);

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
          <div className="main-header" style={{
            paddingLeft: limitPadding ? '2rem' : undefined,
            paddingRight: limitPadding ? '2rem' : undefined
          }}>
            <Button
              className={styles.menuButton}
              inverted
              icon="bars"
              basic
              size="huge"
              onClick={() => setSidebarVisible(true)}
            />
            <Fade bottom>
              <div className="logo" style={{width: logoWidth}}>
                <img src={logoUrl} />
              </div>
            </Fade>
            <div className={styles.banner} style={{
              width: limitPadding ? '100%' : undefined
            }}>
              <Fade delay={500} duration={1000} when={scrolled}>
                <div className="bp1-animate-enter4">יְהֹוָה</div>
              </Fade>
              <div style={{top: '-23px'}}>יהוה</div>
            </div>
          </div>
          <div className="overlap-group2" style={{
            paddingLeft: limitPadding ? '2rem' : undefined,
            paddingRight: limitPadding ? '2rem' : undefined
          }}>
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
      <ResponsiveContext.Provider value={{
        xs: 0,
        sm: 768,
        md: 992,
        lg: 1200,
        xl: 1920
      }}>
        <Content navItems={links || []} />
      </ResponsiveContext.Provider>
    </ComponentLookupContext.Provider>
  </MobileLayout>;
};
