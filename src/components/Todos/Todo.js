import React from 'react';
import PropTypes from 'prop-types';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../UI/Modals/Modal';
import AddAndUpdate from '../Forms/AddAndUpdate';
import { uiActions } from '../../redux/ui/uiSlice';
import Button from '../UI/Button';
import classes from './Todo.module.css';

const Todo = ({
  id, threadId, title, isCompleted,
}) => {
  const showModal = useSelector((state) => state.ui.showEditTodoModal);
  const dispatch = useDispatch();

  const todoClasses = isCompleted
    ? `${classes.todo} ${classes.completed}`
    : classes.todo;
  return (
    <li className={todoClasses}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => console.log('checked')}
      />
      <h3>{title}</h3>
      <div className={classes.actions}>
        <Button
          onClick={() => dispatch(uiActions.openEditTodoModal())}
          extraClass={classes.btn_actions}
        >
          <FaRegEdit />
        </Button>
        <Button
          onClick={() => console.log('Delete Button is clicked', id, threadId)}
          extraClass={classes.btn_actions}
        >
          <FaRegTrashAlt />
        </Button>
      </div>
      {showModal && (
        <Modal isPromt>
          <AddAndUpdate
            action="edit-todo"
            data={{
              id,
              threadId,
              title,
              isCompleted,
            }}
          />
        </Modal>
      )}
    </li>
  );
};

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  threadId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};

export default Todo;
