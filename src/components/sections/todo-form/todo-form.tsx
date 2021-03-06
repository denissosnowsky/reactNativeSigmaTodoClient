import React, { useMemo, useRef, useState, VFC } from 'react';
import { Animated, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import todoSelectors from '~store/todo/todo.selectors';
import authSelectors from '~store/auth/auth.selectors';
import { ModalFC } from '~components/common/modal';
import { useChangeColor } from '~hooks/useChangeColor';
import { ListFilter } from '~components/list-filter';
import { ImportantEnum } from '~types/todo.types';
import { useAnimation } from './hooks/useAnimation';
import { TodoFormState } from './utils/TodoFormState';
import { TodoFormInput } from './components/todo-form-input';
import { TodoFormButtons } from './components/todo-form-buttons';
import styles from './todo-form.style';

export const TodoForm: VFC<Props> = ({
  listScrollY,
  scrollAnimatedOffset,
  chosenPriority,
  setChosenPriority,
}) => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState(false);
  const [titleColor, setTitleColor] = useChangeColor();

  const letterWidth = useRef(new Animated.Value(0)).current;
  const filtersHeight = useRef(new Animated.Value(0)).current;
  const letterScaleAndOpacity = useRef(new Animated.Value(0)).current;
  const filtersScaleAndOpacity = useRef(new Animated.Value(0)).current;

  const isEditingMode = useSelector(todoSelectors.editingMode);
  const editingTodos = useSelector(todoSelectors.editingTodos);
  const editingInput = useSelector(todoSelectors.editingInput);
  const isDeleteModalOpened = useSelector(todoSelectors.isDeleteModalOpened);
  const formInput = useSelector(todoSelectors.formInput);
  const userId = useSelector(authSelectors.userId);
  const testMode = useSelector(authSelectors.testMode);

  const ItemStateClassParams = {
    userId,
    filter,
    formInput,
    titleColor,
    editingInput,
    editingTodos,
    isEditingMode,
    listScrollY,
    letterWidth,
    isDeleteModalOpened,
    scrollAnimatedOffset,
    filtersHeight,
    chosenPriority,
    letterScaleAndOpacity,
    filtersScaleAndOpacity,
    dispatch,
    setFilter,
    setTitleColor,
    setChosenPriority,
  };

  const ItemState = useMemo(
    () => new TodoFormState(ItemStateClassParams),
    Object.values(ItemStateClassParams),
  );

  useAnimation(
    listScrollY,
    scrollAnimatedOffset,
    letterScaleAndOpacity,
    letterWidth,
    ItemState.logoLetterWidth,
  );

  return (
    <>
      <View style={styles.wrapepr}>
        {!isEditingMode ? (
          <TodoFormInput
            letterScaleAndOpacity={ItemState.letterScaleAndOpacity}
            letterWidth={ItemState.letterWidth}
            titleColor={ItemState.titleColor}
            filter={ItemState.filter}
            formValue={ItemState.formInput}
            setFormValue={ItemState.changeFormInput}
            filterOnChange={ItemState.onFilterClickHandler}
            addOnChange={ItemState.addHandler}
            setTitleColor={ItemState.setTitleColor}
          />
        ) : (
          <TodoFormButtons
            isMultipleEditing={ItemState.isMultipleEditing}
            chosenPriority={ItemState.chosenPriority}
            currentTodoPriority={ItemState.currentTodoPriority}
            nonChosenPriorityButtons={ItemState.nonChosenPriorityButtons}
            isSaveButtonShouldBeShown={ItemState.isSaveButtonShouldBeShown}
            changeHandler={ItemState.changeHandler}
            selectAllHandler={ItemState.selectAllHandler}
            cancelAllHandler={ItemState.cancelAllHandler}
            todoEditDeleteModalModeOn={ItemState.todoEditDeleteModalModeOn}
          />
        )}
      </View>
      <ModalFC
        showModal={isDeleteModalOpened}
        confirm={ItemState.deleteHandler}
        decline={ItemState.cancelAllHandler}
        text={`Delete ${editingTodos.length} ${ItemState.isMultipleEditing ? 'todos' : 'todo'}?`}
      />
      {!isEditingMode && !testMode && (
        <ListFilter height={filtersHeight} scaleAndOpacity={filtersScaleAndOpacity} />
      )}
    </>
  );
};

type Props = {
  listScrollY: Animated.Value;
  scrollAnimatedOffset: number;
  chosenPriority: ImportantEnum | null;
  setChosenPriority: (arg: ImportantEnum | null) => void;
};
