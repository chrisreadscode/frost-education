import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';
import PillarPiece from './pillarPiece';
import { BiCircle } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';

import { AiOutlineCheck } from 'react-icons/ai';
import { TbCircleCheck } from 'react-icons/tb';
import { MdOutlineCircle } from 'react-icons/md';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { TbCircleDashed } from 'react-icons/tb';
import { useState } from 'react';

import style from '../../styles/course-menu-pillar.module.css';

export default function Pillar({ pillarPieces }) {
  const color = '#3C97F7';
  const size = 25;

  const isPillarComplete = () => {
    let count = 0;
    for (let piece of pillarPieces.coursePages) {
      if (piece.studentsProgress[0].complete) count += 1;
    }
    const complete = count === pillarPieces.coursePages.length ? true : false;
    return complete;
  };
  const complete = isPillarComplete();

  // if the project is complete? or if every part is complete?
  const mark = complete ? (
    <FaCheck color={color} size={size} />
  ) : (
    <BiCircle color={color} size={size} />
  );

  // check if all of a pillar's pillars are complete

  const arrow = show ? (
    <MdKeyboardArrowDown color={color} size={size} />
  ) : (
    <MdKeyboardArrowRight size={size} />
  );

  const getPillarTitle = (pillarPieces) => {
    const pillarName = pillarPieces.name;
    const arr = pillarName.split('-');
    const pillarTitle = arr.map(
      (word) => word[0].toUpperCase() + word.substring(1)
    );
    return pillarTitle.join(' ');
  };

  const pillarTitle = getPillarTitle(pillarPieces);

  const open = pillarTitle === 'Introduction' ? true : false;

  const [show, setShow] = useState(open ? true : false);
  const showClick = () => (open ? setShow((show) => !show) : null);

  return (
    <div>
      <div
        className={
          open ? `${style.pillarLine} ${style.open}` : style.pillarLine
        }
        onClick={showClick}
      >
        {arrow}
        {pillarTitle}
        {mark}
      </div>
      {show ? (
        <div
          className={
            open
              ? `${style.pillarPieces} ${style.openPieces}`
              : style.pillarPieces
          }
        >
          {pillarPieces.coursePages.map((piece) => {
            const obj = { ...piece, pillarName: pillarPieces.name };
            return <PillarPiece piece={obj} />;
          })}
          {/* <SubPillar
            lessonTitle="notes"
            pillarTitle={pillarTitle}
            type="notes"
          /> */}
        </div>
      ) : null}
    </div>
  );
}
