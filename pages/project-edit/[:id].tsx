/* eslint-disable no-mixed-spaces-and-tabs */
// ========== Project Edit
// import all modules
import React, {
  Fragment, useState, useRef, useEffect,
} from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import * as Styled from '../../styles';

// import all components
import {
  Head,
  Navbar,
  Container,
  Footer,
  TextField,
  LongText,
  Button,
} from '../../components';
import { IEvent, IGlobalStates, IProjects } from '../../interfaces';
import Services from '../../services';
import { generateFormData } from '../../helpers';
import { setProject } from '../../redux/actions';

const ProjectEdit: NextPage = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const project: IProjects = useSelector((current: IGlobalStates) => current.projects.project);
  const router = useRouter();

	interface State {
		projectName: string;
		technologies: string;
		projectDescription: string;
		img: FileList | null;
		loading: boolean;
	}

	const [state, setState] = useState<State>({
	  projectName: '',
	  technologies: '',
	  projectDescription: '',
	  img: null,
	  loading: false,
	});

	useEffect(() => {
	  if (router.isReady) {
	    dispatch(setProject(Number(router.query[':id'])));
	  }

	  return () => {
	    dispatch({
	      type: 'SET_PROJECT',
	      payload: {
	        data: {
	          project: {
	            id: 0,
	            title: '',
	            technologies: [],
	            description: '',
	            img: '',
	          },
	        },
	      },
	    });
	  };
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.isReady]);

	useEffect(() => {
	  setState((current) => ({
	    ...current,
	    projectName: project.title,
	    technologies: project.technologies.map((item) => item.name).join(', '),
	    projectDescription: project.description,
	    img: null,
	    loading: false,
	  }));
	}, [project]);

	const accessToken: string = useSelector((states: IGlobalStates) => states.auth.accessToken);
	const refreshToken: string = useSelector((states: IGlobalStates) => states.auth.refreshToken);

	const handleChange = 	(
	  name: string,
	  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
	  setState((currentState) => ({
	    ...currentState,
	    [name]: e.target.value,
	  }));
	};

	const handleChangeFile = 	(e: IEvent<HTMLInputElement>) => {
	  setState((current) => ({
	    ...current,
	    img: e.target.files,
	  }));
	};

	const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
	  e.preventDefault();
	  handleCreate();
	};

	if (accessToken === '' && refreshToken === '') {
	  router.push('/login');
	}

	const handleCreate = async () => {
	 if (state.img && state.img.length > 0) {
	    setState((current) => ({
	      ...current,
	      loading: true,
	  	}));

	  const body = {
	    title: state.projectName,
	    technologies: state.technologies,
	    description: state.projectDescription,
	    img: state.img[0],
	  };

	  const form = generateFormData(body);

	  try {
	    const { data } = await Services.updateProject(project.id, form);
	    Swal.fire({
	      title: 'Success',
	      icon: 'success',
	      text: data.message,
	    }).then((confirm) => {
	        if (confirm.isConfirmed) {
	          router.push('/');
	        }
	      });
	  } catch (err: any) {
	    Swal.fire({
	      title: 'Failed',
	      icon: 'error',
	      text: err.message,
	    });
	  }
	 } else {
	    setState((current) => ({
	      ...current,
	      loading: true,
	    }));

	    const body = {
	      title: state.projectName,
	      technologies: state.technologies,
	      description: state.projectDescription,
	    };

	    const form = generateFormData(body);

	    try {
	      const { data } = await Services.updateProject(project.id, form);
	      Swal.fire({
	        title: 'Success',
	        icon: 'success',
	        text: data.message,
	      }).then((confirm) => {
	        if (confirm.isConfirmed) {
	          router.push('/');
	        }
	      });
	    } catch (err: any) {
	      Swal.fire({
	        title: 'Failed',
	        icon: 'error',
	        text: err.message,
	      });
	    }
	 }
	};

	return (
  <Fragment>
    <Head title="Create a Project" />
    <Styled.HeroCreateProject>
      <Navbar />
      <Styled.HeroCreateProjectBody>
        <Container
          inheritHeight
          customSize={{
            value: 80,
          }}
        >
          <Styled.HeroCreateProjectFlex>
            <Styled.HeroCreateProjectCol>
              <Styled.HeroCreateProjectImageContainer>
                <Image
                  src="/icons/create-project-img.svg"
                  width={250}
                  height={250}
                  layout="responsive"
                  alt="Create Project"
                />
              </Styled.HeroCreateProjectImageContainer>
            </Styled.HeroCreateProjectCol>
            <Styled.HeroCreateProjectCol>
              <Styled.HeroCreateProjectTitle>
                Edit a Project
              </Styled.HeroCreateProjectTitle>
              <Styled.HeroCreateProjectForm onSubmit={handleSave}>
                <Styled.HeroCreateProjectControl>
                  <Styled.HeroCreateProjectLabel htmlFor="project-name">
                    Project Name
                  </Styled.HeroCreateProjectLabel>
                  <Styled.HeroCreateProjectField>
                    <TextField
                      placeholder="Project Name..."
                      type="text"
                      id="project-name"
                      value={state.projectName}
                      onChange={(event) => handleChange('projectName', event)}
                    />
                  </Styled.HeroCreateProjectField>
                </Styled.HeroCreateProjectControl>
                <Styled.HeroCreateProjectControl>
                  <Styled.HeroCreateProjectLabel htmlFor="technology">
                    Technologies (example : HTML, CSS)
                  </Styled.HeroCreateProjectLabel>
                  <Styled.HeroCreateProjectField>
                    <TextField
                      placeholder="Technologies..."
                      type="text"
                      id="technology"
                      value={state.technologies}
                      onChange={(event) => handleChange('technologies', event)}
                    />
                  </Styled.HeroCreateProjectField>
                </Styled.HeroCreateProjectControl>
                <Styled.HeroCreateProjectControl>
                  <Styled.HeroCreateProjectLabel htmlFor="technology">
                    Image
                  </Styled.HeroCreateProjectLabel>
                  <Styled.HeroCreateProjectField>
                    <Styled.FileContainer htmlFor="img">
                      <Styled.File
                        type="file"
                        id="img"
                        ref={fileRef}
                        onChange={handleChangeFile}
                      />
                      {state.img ? state.img[0].name : 'Project Image '}
                    </Styled.FileContainer>
                  </Styled.HeroCreateProjectField>
                </Styled.HeroCreateProjectControl>
                <Styled.HeroCreateProjectControl>
                  <Styled.HeroCreateProjectLabel htmlFor="project-description">
                    Project Description
                  </Styled.HeroCreateProjectLabel>
                  <Styled.HeroCreateProjectField>
                    <LongText
                      placeholder="Project Description..."
                      id="project-description"
                      value={state.projectDescription}
                      onChange={(event) => handleChange('projectDescription', event)}
                    />
                  </Styled.HeroCreateProjectField>
                </Styled.HeroCreateProjectControl>
                <Styled.HeroCreateProjectControl>
                  <Button type="submit" size="md" fluid>
                    Save
                  </Button>
                </Styled.HeroCreateProjectControl>
              </Styled.HeroCreateProjectForm>
            </Styled.HeroCreateProjectCol>
          </Styled.HeroCreateProjectFlex>
        </Container>
      </Styled.HeroCreateProjectBody>
    </Styled.HeroCreateProject>
    <Footer />
  </Fragment>
	);
};

export default ProjectEdit;
