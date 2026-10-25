import React, { Fragment, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { IconType } from 'react-icons';
import { SiFacebook, SiX, SiYoutube } from 'react-icons/si';
import Swal from 'sweetalert2';
import * as Styled from '../styles';
import {
  Head,
  Navbar,
  Container,
  Footer,
  TextField,
  LongText,
  Button,
  SkillsInput,
  SkillsSection,
  SocialLinks,
} from '../components';
import Services from '../services';
import { getErrorMessage, validateProfile } from '../helpers';
import { loadProfile, setCachedProfile } from '../hooks/useProfile';
import { IGlobalStates, IProfile } from '../interfaces';

interface ISocialField {
  name: 'facebookUrl' | 'twitterUrl' | 'youtubeUrl';
  id: string;
  label: string;
  Icon: IconType;
}

const SOCIAL_FIELDS: ISocialField[] = [
  {
    name: 'facebookUrl',
    id: 'facebook-url',
    label: 'Facebook',
    Icon: SiFacebook,
  },
  { name: 'twitterUrl', id: 'twitter-url', label: 'Twitter', Icon: SiX },
  { name: 'youtubeUrl', id: 'youtube-url', label: 'Youtube', Icon: SiYoutube },
];

const trimProfile = (profile: IProfile): IProfile => ({
  skills: profile.skills.map((skill) => skill.trim()),
  skillsDescription: profile.skillsDescription.trim(),
  facebookUrl: profile.facebookUrl.trim(),
  twitterUrl: profile.twitterUrl.trim(),
  youtubeUrl: profile.youtubeUrl.trim(),
});

const ProfileEdit: NextPage = () => {
  const [values, setValues] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const accessToken: string = useSelector(
    (states: IGlobalStates) => states.auth.accessToken,
  );
  const refreshToken: string = useSelector(
    (states: IGlobalStates) => states.auth.refreshToken,
  );

  const isLoggedOut = accessToken === '' && refreshToken === '';

  useEffect(() => {
    if (isLoggedOut) {
      router.push('/login');
    }
  }, [isLoggedOut, router]);

  useEffect(() => {
    let isMounted = true;

    loadProfile().then((profile) => {
      if (isMounted) {
        setValues(profile);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const setField = <K extends keyof IProfile>(name: K, value: IProfile[K]) => {
    setValues((current) => (current ? { ...current, [name]: value } : current));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values) {
      return;
    }

    setLoading(true);

    try {
      const { data } = await Services.updateProfile(trimProfile(values));
      setCachedProfile(data.results);

      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: data.message,
        didClose() {
          router.push('/');
        },
      });
    } catch (err: unknown) {
      setLoading(false);

      Swal.fire({
        title: 'Failed',
        icon: 'error',
        text: getErrorMessage(err),
      });
    }
  };

  const errors = values ? validateProfile(values) : {};
  const buttonDisabled = loading || Object.keys(errors).length > 0;

  return (
    <Fragment>
      <Head title="Edit Profile" />
      <Styled.HeroEdit>
        <Navbar />
        <Container
          customSize={{
            value: 80,
          }}
        >
          <Styled.HeroEditFlex>
            <Styled.HeroEditFormCol>
              <Styled.HeroCreateAuthTitle>
                Edit Profile
              </Styled.HeroCreateAuthTitle>
              {values ? (
                <Styled.HeroCreateAuthForm onSubmit={handleSubmit}>
                  <Styled.ProfileEditGroupTitle>
                    Skills section
                  </Styled.ProfileEditGroupTitle>
                  <Styled.HeroCreateAuthControl>
                    <Styled.HeroCreateAuthLabel htmlFor="skills-description">
                      Description
                    </Styled.HeroCreateAuthLabel>
                    <Styled.HeroCreateAuthField>
                      <LongText
                        id="skills-description"
                        placeholder="Tell visitors what you build with..."
                        value={values.skillsDescription}
                        invalidMessage={errors.skillsDescription}
                        onChange={(event) =>
                          setField('skillsDescription', event.target.value)
                        }
                      />
                    </Styled.HeroCreateAuthField>
                  </Styled.HeroCreateAuthControl>
                  <Styled.HeroCreateAuthControl>
                    <Styled.HeroCreateAuthLabel htmlFor="skills">
                      Skills
                    </Styled.HeroCreateAuthLabel>
                    <Styled.HeroCreateAuthField>
                      <SkillsInput
                        id="skills"
                        skills={values.skills}
                        invalidMessage={errors.skills}
                        onChange={(skills) => setField('skills', skills)}
                      />
                    </Styled.HeroCreateAuthField>
                  </Styled.HeroCreateAuthControl>
                  <Styled.ProfileEditGroupTitle>
                    Footer social links
                  </Styled.ProfileEditGroupTitle>
                  {SOCIAL_FIELDS.map(({ name, id, label, Icon }) => (
                    <Styled.HeroCreateAuthControl key={name}>
                      <Styled.ProfileEditLabel htmlFor={id}>
                        <Icon size={14} aria-hidden />
                        {label}
                      </Styled.ProfileEditLabel>
                      <Styled.HeroCreateAuthField>
                        <TextField
                          id={id}
                          type="url"
                          placeholder="https://... (leave empty to hide it)"
                          value={values[name]}
                          invalidMessage={errors[name]}
                          onChange={(event) =>
                            setField(name, event.target.value)
                          }
                        />
                      </Styled.HeroCreateAuthField>
                    </Styled.HeroCreateAuthControl>
                  ))}
                  <Styled.HeroCreateAuthControl>
                    <Button
                      type="submit"
                      size="md"
                      disabled={buttonDisabled}
                      fluid
                    >
                      {loading ? 'Saving...' : 'Save'}
                    </Button>
                  </Styled.HeroCreateAuthControl>
                </Styled.HeroCreateAuthForm>
              ) : (
                <Styled.HeroCreateAuthLabel as="p">
                  Loading...
                </Styled.HeroCreateAuthLabel>
              )}
            </Styled.HeroEditFormCol>
            {values && (
              <Styled.HeroEditPreview aria-labelledby="profile-preview-label">
                <Styled.HeroEditPreviewLabel id="profile-preview-label">
                  Preview
                </Styled.HeroEditPreviewLabel>
                <SkillsSection
                  skills={values.skills}
                  description={values.skillsDescription}
                  preview
                />
                <Styled.ProfileEditPreviewFooter>
                  <span>Footer icons</span>
                  <SocialLinks links={values} />
                </Styled.ProfileEditPreviewFooter>
              </Styled.HeroEditPreview>
            )}
          </Styled.HeroEditFlex>
        </Container>
      </Styled.HeroEdit>
      <Footer />
    </Fragment>
  );
};

export default ProfileEdit;
