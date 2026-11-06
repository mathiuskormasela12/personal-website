import React, { Fragment, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
  FiAlignLeft,
  FiBriefcase,
  FiCalendar,
  FiEdit2,
  FiPlus,
  FiTrash2,
  FiUser,
} from 'react-icons/fi';
import Swal from 'sweetalert2';
import * as Styled from '../styles';
import {
  Head,
  Navbar,
  Container,
  Footer,
  TextField,
  Button,
  ExperienceSection,
  DescriptionInput,
} from '../components';
import Services from '../services';
import {
  MONTH_PATTERN,
  formatMonth,
  getCurrentMonth,
  getErrorMessage,
  sortExperiences,
  validateExperience,
} from '../helpers';
import { loadExperiences, setCachedExperiences } from '../hooks/useExperiences';
import { IExperience, IExperienceBody, IGlobalStates } from '../interfaces';

const EMPTY_FORM: IExperienceBody = {
  company: '',
  role: '',
  startDate: '',
  endDate: '',
  description: [''],
};

const DRAFT_ID = -1;

const COMPANY_FIELD_ID = 'experience-company';

const focusCompanyField = () =>
  document.getElementById(COMPANY_FIELD_ID)?.focus();

const toBody = (values: IExperienceBody): IExperienceBody => ({
  company: values.company.trim(),
  role: values.role.trim(),
  startDate: values.startDate,
  endDate: values.endDate,
  description: values.description.map((point) => point.trim()),
});

const toForm = ({
  company,
  role,
  startDate,
  endDate,
  description,
}: IExperience) => ({
  company,
  role,
  startDate,
  endDate,
  description: description.length > 0 ? [...description] : [''],
});

const isPreviewable = (values: IExperienceBody) =>
  values.company.trim() !== '' &&
  values.role.trim() !== '' &&
  MONTH_PATTERN.test(values.startDate);

const getPreviewList = (
  experiences: IExperience[],
  values: IExperienceBody,
  editingId: number | null,
) => {
  const others = experiences.filter(({ id }) => id !== editingId);
  const original = experiences.filter(({ id }) => id === editingId);
  const draft = isPreviewable(values)
    ? [
        {
          id: editingId ?? DRAFT_ID,
          ...values,
          description: values.description
            .map((point) => point.trim())
            .filter(Boolean),
        },
      ]
    : original;

  return sortExperiences([...others, ...draft]);
};

const formatRange = ({ startDate, endDate }: IExperience) =>
  `${formatMonth(startDate)} — ${endDate ? formatMonth(endDate) : 'Present'}`;

const ExperienceEdit: NextPage = () => {
  const [experiences, setExperiences] = useState<IExperience[] | null>(null);
  const [values, setValues] = useState<IExperienceBody>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showErrors, setShowErrors] = useState(false);
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

    loadExperiences().then((loaded) => {
      if (isMounted) {
        setExperiences(loaded);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const saveList = (list: IExperience[]) => {
    const sorted = sortExperiences(list);
    setExperiences(sorted);
    setCachedExperiences(sorted);
  };

  const resetForm = () => {
    setValues(EMPTY_FORM);
    setEditingId(null);
    setShowErrors(false);
  };

  const setField = <K extends keyof IExperienceBody>(
    name: K,
    value: IExperienceBody[K],
  ) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleAdd = () => {
    resetForm();
    focusCompanyField();
  };

  const handleEdit = (experience: IExperience) => {
    setValues(toForm(experience));
    setEditingId(experience.id);
    setShowErrors(false);
    focusCompanyField();
  };

  const handleDelete = async (experience: IExperience) => {
    const result = await Swal.fire({
      title: 'Delete this experience?',
      text: `"${experience.role} at ${experience.company}" will be removed from your website. This can't be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc3741',
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const { data } = await Services.deleteExperience(experience.id);
      saveList((experiences ?? []).filter(({ id }) => id !== experience.id));

      if (editingId === experience.id) {
        resetForm();
      }

      Swal.fire({ title: 'Success', icon: 'success', text: data.message });
    } catch (err: unknown) {
      Swal.fire({ title: 'Failed', icon: 'error', text: getErrorMessage(err) });
    }
  };

  const errors = validateExperience(values);
  const hasErrors = Object.keys(errors).length > 0;
  const visibleErrors = showErrors ? errors : {};

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (hasErrors) {
      setShowErrors(true);
      return;
    }

    setLoading(true);

    try {
      const body = toBody(values);
      const { data } =
        editingId === null
          ? await Services.createExperience(body)
          : await Services.updateExperience(editingId, body);
      const saved: IExperience = data.results;

      saveList([
        ...(experiences ?? []).filter(({ id }) => id !== saved.id),
        saved,
      ]);
      resetForm();
      Swal.fire({ title: 'Success', icon: 'success', text: data.message });
    } catch (err: unknown) {
      Swal.fire({ title: 'Failed', icon: 'error', text: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  const previewList = getPreviewList(experiences ?? [], values, editingId);
  const isCurrent = values.endDate === null;

  return (
    <Fragment>
      <Head title="Edit Experience" />
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
                Edit Experience
              </Styled.HeroCreateAuthTitle>
              {experiences ? (
                <Fragment>
                  <Styled.ExperienceEditGroupHead>
                    <Styled.ProfileEditGroupTitle>
                      Your experience
                    </Styled.ProfileEditGroupTitle>
                    <span>{experiences.length}</span>
                  </Styled.ExperienceEditGroupHead>
                  {experiences.length > 0 ? (
                    <Styled.ExperienceEditList aria-label="Your experience">
                      {experiences.map((experience) => {
                        const editing = experience.id === editingId;
                        const name = `${experience.role} at ${experience.company}`;

                        return (
                          <Styled.ExperienceEditRow
                            key={experience.id}
                            $editing={editing}
                          >
                            <Styled.ExperienceEditRowText>
                              <Styled.ExperienceEditRowRole>
                                {experience.role}
                                {editing && (
                                  <Styled.ExperienceEditTag>
                                    Editing
                                  </Styled.ExperienceEditTag>
                                )}
                              </Styled.ExperienceEditRowRole>
                              <Styled.ExperienceEditRowMeta>
                                {`${experience.company} · ${formatRange(experience)}`}
                              </Styled.ExperienceEditRowMeta>
                            </Styled.ExperienceEditRowText>
                            <Styled.ExperienceEditIconButton
                              type="button"
                              aria-label={`Edit ${name}`}
                              onClick={() => handleEdit(experience)}
                            >
                              <FiEdit2 size={15} aria-hidden />
                            </Styled.ExperienceEditIconButton>
                            <Styled.ExperienceEditIconButton
                              type="button"
                              $danger
                              aria-label={`Delete ${name}`}
                              onClick={() => handleDelete(experience)}
                            >
                              <FiTrash2 size={15} aria-hidden />
                            </Styled.ExperienceEditIconButton>
                          </Styled.ExperienceEditRow>
                        );
                      })}
                    </Styled.ExperienceEditList>
                  ) : (
                    <Styled.ExperienceEditEmpty>
                      No experience yet. Add your first one below.
                    </Styled.ExperienceEditEmpty>
                  )}
                  <Styled.ExperienceEditAddButton
                    type="button"
                    onClick={handleAdd}
                  >
                    <FiPlus size={16} aria-hidden />
                    Add experience
                  </Styled.ExperienceEditAddButton>
                  <Styled.ExperienceEditFormTitle>
                    {editingId === null ? 'New experience' : 'Edit experience'}
                  </Styled.ExperienceEditFormTitle>
                  <Styled.HeroCreateAuthForm onSubmit={handleSubmit} noValidate>
                    <Styled.HeroCreateAuthControl>
                      <Styled.ProfileEditLabel htmlFor={COMPANY_FIELD_ID}>
                        <FiBriefcase size={14} aria-hidden />
                        Company
                      </Styled.ProfileEditLabel>
                      <Styled.HeroCreateAuthField>
                        <TextField
                          id={COMPANY_FIELD_ID}
                          placeholder="Where did you work?"
                          value={values.company}
                          invalidMessage={visibleErrors.company}
                          onChange={(event) =>
                            setField('company', event.target.value)
                          }
                        />
                        <Styled.ExperienceEditHint>
                          Roles at the same company share one tab.
                        </Styled.ExperienceEditHint>
                      </Styled.HeroCreateAuthField>
                    </Styled.HeroCreateAuthControl>
                    <Styled.HeroCreateAuthControl>
                      <Styled.ProfileEditLabel htmlFor="experience-role">
                        <FiUser size={14} aria-hidden />
                        Role
                      </Styled.ProfileEditLabel>
                      <Styled.HeroCreateAuthField>
                        <TextField
                          id="experience-role"
                          placeholder="What was your job title?"
                          value={values.role}
                          invalidMessage={visibleErrors.role}
                          onChange={(event) =>
                            setField('role', event.target.value)
                          }
                        />
                      </Styled.HeroCreateAuthField>
                    </Styled.HeroCreateAuthControl>
                    <Styled.ExperienceEditDates>
                      <Styled.HeroCreateAuthControl>
                        <Styled.ProfileEditLabel htmlFor="experience-start">
                          <FiCalendar size={14} aria-hidden />
                          Start date
                        </Styled.ProfileEditLabel>
                        <Styled.HeroCreateAuthField>
                          <TextField
                            id="experience-start"
                            type="month"
                            placeholder="YYYY-MM"
                            max={getCurrentMonth()}
                            value={values.startDate}
                            invalidMessage={visibleErrors.startDate}
                            onChange={(event) =>
                              setField('startDate', event.target.value)
                            }
                          />
                        </Styled.HeroCreateAuthField>
                      </Styled.HeroCreateAuthControl>
                      <Styled.HeroCreateAuthControl>
                        <Styled.ProfileEditLabel htmlFor="experience-end">
                          <FiCalendar size={14} aria-hidden />
                          End date
                        </Styled.ProfileEditLabel>
                        <Styled.HeroCreateAuthField>
                          <TextField
                            id="experience-end"
                            type={isCurrent ? 'text' : 'month'}
                            placeholder="YYYY-MM"
                            max={getCurrentMonth()}
                            disabled={isCurrent}
                            value={
                              isCurrent ? 'Present' : (values.endDate ?? '')
                            }
                            invalidMessage={visibleErrors.endDate}
                            onChange={(event) =>
                              setField('endDate', event.target.value)
                            }
                          />
                        </Styled.HeroCreateAuthField>
                      </Styled.HeroCreateAuthControl>
                    </Styled.ExperienceEditDates>
                    <Styled.HeroCreateAuthControl>
                      <Styled.ExperienceEditCheckbox>
                        <input
                          type="checkbox"
                          checked={isCurrent}
                          onChange={(event) =>
                            setField(
                              'endDate',
                              event.target.checked ? null : '',
                            )
                          }
                        />
                        I currently work here
                      </Styled.ExperienceEditCheckbox>
                    </Styled.HeroCreateAuthControl>
                    <Styled.HeroCreateAuthControl>
                      <Styled.ProfileEditLabel htmlFor="experience-description">
                        <FiAlignLeft size={14} aria-hidden />
                        Description
                      </Styled.ProfileEditLabel>
                      <Styled.HeroCreateAuthField>
                        <DescriptionInput
                          id="experience-description"
                          points={values.description}
                          pointErrors={visibleErrors.points}
                          invalidMessage={visibleErrors.description}
                          onChange={(points) => setField('description', points)}
                        />
                      </Styled.HeroCreateAuthField>
                    </Styled.HeroCreateAuthControl>
                    <Styled.HeroCreateAuthControl>
                      <Styled.ExperienceEditActions>
                        <Button type="submit" size="md" loading={loading} fluid>
                          {editingId === null ? 'Add' : 'Save changes'}
                        </Button>
                        {editingId !== null && (
                          <Styled.ExperienceEditCancel
                            type="button"
                            onClick={resetForm}
                          >
                            Cancel
                          </Styled.ExperienceEditCancel>
                        )}
                      </Styled.ExperienceEditActions>
                    </Styled.HeroCreateAuthControl>
                  </Styled.HeroCreateAuthForm>
                </Fragment>
              ) : (
                <Styled.HeroCreateAuthLabel as="p">
                  Loading...
                </Styled.HeroCreateAuthLabel>
              )}
            </Styled.HeroEditFormCol>
            {experiences && (
              <Styled.HeroEditPreview aria-labelledby="experience-preview-label">
                <Styled.HeroEditPreviewLabel id="experience-preview-label">
                  Preview
                </Styled.HeroEditPreviewLabel>
                {previewList.length > 0 ? (
                  <ExperienceSection
                    experiences={previewList}
                    editingId={editingId ?? DRAFT_ID}
                    preview
                  />
                ) : (
                  <Styled.ExperienceEditPreviewEmpty>
                    Your experience will show up here. While the list is empty,
                    the section stays hidden on your home page.
                  </Styled.ExperienceEditPreviewEmpty>
                )}
              </Styled.HeroEditPreview>
            )}
          </Styled.HeroEditFlex>
        </Container>
      </Styled.HeroEdit>
      <Footer />
    </Fragment>
  );
};

export default ExperienceEdit;
