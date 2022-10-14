import { BiCircle } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';
import Link from 'next/link';

import { BsCheck } from 'react-icons/bs';
import { FiSquare } from 'react-icons/fi';
import { FaSquareFull, FaSquare } from 'react-icons/fa';
import { GiPlainSquare } from 'react-icons/gi';
import { SiSnowflake } from 'react-icons/si';

import { BiNote } from 'react-icons/bi';
import { FaRegStickyNote } from 'react-icons/fa';
import { RiStickyNoteLine } from 'react-icons/ri';
import { TbNotes } from 'react-icons/tb';

import style from '../../styles/pillar-piece.module.css';

export default function SubPillar({ piece }) {
  const color = '#3C97F7';
  const size = 15;

  const { category, pillarName: pillar, studentsProgress, title } = piece;
  const { complete } = studentsProgress[0];

  const mark = complete ? (
    <FaCheck color={color} size={size} />
  ) : (
    <BiCircle color={color} size={size} />
  );

  let icon;
  /* FASquare for curved sides */
  if (category === 'project') {
    icon = <SiSnowflake color={complete ? color : 'lightgrey'} size={15} />;
  } else {
    icon = <FaSquareFull color={complete ? color : 'lightgrey'} size={15} />;
  }
  // else {
  //   icon = <TbNotes color={complete ? color : 'lightgrey'} size={15} />;
  // }

  const lower = title.toLowerCase();
  const urlTitle = lower.replaceAll(' ', '-');

  return (
    <div className={style.pillarPieceLine}>
      <Link href={`/${pillar}/${category}/${urlTitle}`}>
        <a className={style.iconAndTitle}>
          {icon}
          <div className={style.title}>{title}</div>
        </a>
      </Link>
      {mark}
    </div>
  );
}
