import React, { Fragment, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
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
  HeroContent,
  HeroSkeleton,
  HeroFormSkeleton,
} from '../components';
import Services from '../services';
import { getErrorMessage, validateHero } from '../helpers';
import { loadHero, setCachedHero } from '../hooks/useHero';
import { IGlobalStates, IHero } from '../interfaces';

interface IHeroFormField {
  name: keyof IHero;
  id: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
}

const HERO_FORM_FIELDS: IHeroFormField[] = [
  {
    name: 'titlePrefix',
    id: 'title-prefix',
    label: 'Greeting',
    placeholder: "Hi, I'm",
  },
  {
    name: 'titleHighlight',
    id: 'title-highlight',
    label: 'Highlighted Text',
    placeholder: 'a Fullstack Developer',
  },
  {
    name: 'titleSuffix',
    id: 'title-suffix',
    label: 'Ending',
    placeholder: '.',
  },
  {
    name: 'subtitle',
    id: 'subtitle',
    label: 'Subtitle',
    placeholder: 'Tell visitors about yourself...',
    multiline: true,
  },
  {
    name: 'buttonText',
    id: 'button-text',
    label: 'Button Text',
    placeholder: 'My Youtube',
  },
  {
    name: 'buttonUrl',
    id: 'button-url',
    label: 'Button Link',
    placeholder: 'https://...',
  },
];

const HeroEdit: NextPage = () => {
  const [values, setValues] = useState<IHero | null>(null);
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

    loadHero().then((hero) => {
      if (isMounted) {
        setValues(hero);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const errors = values ? validateHero(values) : {};
  const buttonDisabled = loading || Object.keys(errors).length > 0;

  const handleChange =
    (name: keyof IHero) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setValues((current) => current && { ...current, [name]: value });
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values) {
      return;
    }

    setLoading(true);

    try {
      const { data } = await Services.updateHero(values);
      setCachedHero({ ...values, ...data.results });

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

  return (
    <Fragment>
      <Head title="Edit Hero" />
      <Styled.HeroEdit>
        <Navbar />
        <Container
          customSize={{
            value: 80,
          }}
        >
          <Styled.HeroEditFlex>
            <Styled.HeroEditFormCol>
              <Styled.HeroCreateAuthTitle>Edit Hero</Styled.HeroCreateAuthTitle>
              {values ? (
                <Styled.HeroCreateAuthForm onSubmit={handleSubmit}>
                  {HERO_FORM_FIELDS.map(
                    ({ name, id, label, placeholder, multiline }) => {
                      const FieldComponent = multiline ? LongText : TextField;

                      return (
                        <Styled.HeroCreateAuthControl key={name}>
                          <Styled.HeroCreateAuthLabel htmlFor={id}>
                            {label}
                          </Styled.HeroCreateAuthLabel>
                          <Styled.HeroCreateAuthField>
                            <FieldComponent
                              id={id}
                              placeholder={placeholder}
                              value={values[name]}
                              invalidMessage={errors[name]}
                              onChange={handleChange(name)}
                            />
                          </Styled.HeroCreateAuthField>
                        </Styled.HeroCreateAuthControl>
                      );
                    },
                  )}
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
                <HeroFormSkeleton fields={HERO_FORM_FIELDS} />
              )}
            </Styled.HeroEditFormCol>
            <Styled.HeroEditPreview aria-labelledby="hero-preview-label">
              <Styled.HeroEditPreviewLabel id="hero-preview-label">
                Preview
              </Styled.HeroEditPreviewLabel>
              {values ? (
                <HeroContent hero={values} preview />
              ) : (
                <HeroSkeleton preview />
              )}
            </Styled.HeroEditPreview>
          </Styled.HeroEditFlex>
        </Container>
      </Styled.HeroEdit>
      <Footer />
    </Fragment>
  );
};

export default HeroEdit;
