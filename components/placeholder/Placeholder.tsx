// ========== Placeholder
// import all modules
import { type NextPage } from 'next';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { IGlobalStates, IPlaceholderProps, IProjects } from '../../interfaces';
import * as Styled from './placeholder.styled';

export const Placeholder: NextPage<IPlaceholderProps> = (props) => {
  const { children, isProject } = props;
  const loading: boolean = useSelector(
    (current: IGlobalStates) => current.projects.loading,
  );
  const projects: IProjects[] = useSelector(
    (current: IGlobalStates) => current.projects.projects,
  );
  const project: IProjects = useSelector(
    (current: IGlobalStates) => current.projects.project,
  );

  if (loading) {
    return (
      <Styled.ImageContainer>
        <Image
          width={100}
          height={100}
          layout="responsive"
          alt="Loading"
          src="/icons/loading-icon.svg"
        />
        <Styled.Text>
          Please Wait...
        </Styled.Text>
      </Styled.ImageContainer>
    );
  }

  if (projects.length < 1 && !isProject) {
    return (
      <Styled.ImageContainer>
        <Image
          width={100}
          height={100}
          layout="responsive"
          alt="Empty"
          src="/icons/empty-icon.svg"
        />
      </Styled.ImageContainer>
    );
  }

  if (project.id < 1 && isProject) {
    return (
      <Styled.ImageContainer>
        <Image
          width={100}
          height={100}
          layout="responsive"
          alt="Empty"
          src="/icons/empty-icon.svg"
        />
      </Styled.ImageContainer>
    );
  }

  return children;
};
