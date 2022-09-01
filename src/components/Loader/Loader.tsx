import * as S from './Loader.styled';
import { FaReact } from 'react-icons/fa';

export function Loader() {
  return (
    <S.Spinner>
      <FaReact size={80} color="rgb(0, 255, 255, 0.5)" />
    </S.Spinner>
  );
}
