import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../shared/components/Modal";
import useIsSidebar from "../../../shared/hooks/useIsSideBarOpen";
import BoardIconImg from "../../../assets/icon-board.svg";
import {
  MobileSideMenu,
  MobileSideMenuAddBoardBtn,
  MobileSideMenuAddBoardBtnText,
  MobileSideMenuBoard,
  MobileSideMenuBoardIcon,
  MobileSideMenuBoardList,
  MobileSideMenuBoardTitle,
  MobileSideMenuTitle,
} from "./Styles";
import {
  selectAllBoards,
  setActive,
} from "../../../shared/services/board/boardSlice";
import ThemeToggle from "../ThemeToggle";

const MobileSide = ({ theme, yay, isSidebarOpen, setIsSidebarOpen }) => {
  const boards = useSelector(selectAllBoards);
  const activeBoard = useSelector((state) => state.activeBoard);

  const dispatch = useDispatch();

  const handleClick = (e, id) => {
    localStorage.setItem("active", id);
    dispatch(setActive(Number(id)));
  };

  const navigate = useNavigate();
  return (
    <Modal
      isOpen={isSidebarOpen}
      width={264}
      withCloseIcon={false}
      variant="top"
      onClose={() => setIsSidebarOpen(false)}
    >
      <MobileSideMenu>
        <MobileSideMenuTitle>{`All Boards (${boards.length})`}</MobileSideMenuTitle>
        <MobileSideMenuBoardList>
          {boards.map((board, idx) => {
            return (
              <MobileSideMenuBoard
                data-id={idx}
                onClick={(e) => handleClick(e, board.id)}
                key={idx}
                isActive={activeBoard.active === board.id ? true : false}
              >
                <MobileSideMenuBoardIcon src={BoardIconImg} />
                <MobileSideMenuBoardTitle
                  isActive={activeBoard.active === board.id ? true : false}
                >
                  {board.name}
                </MobileSideMenuBoardTitle>
              </MobileSideMenuBoard>
            );
          })}
        </MobileSideMenuBoardList>
        <MobileSideMenuAddBoardBtn onClick={() => navigate("/addBoard")}>
          <MobileSideMenuBoardIcon src={BoardIconImg} />
          <MobileSideMenuAddBoardBtnText>
            + Create New Board
          </MobileSideMenuAddBoardBtnText>
        </MobileSideMenuAddBoardBtn>

        <ThemeToggle yay={yay} theme={theme} />
      </MobileSideMenu>
    </Modal>
  );
};

export default MobileSide;
