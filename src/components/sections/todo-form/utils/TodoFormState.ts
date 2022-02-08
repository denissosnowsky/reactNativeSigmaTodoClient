import { Dispatch, SetStateAction } from 'react';
import { Animated } from 'react-native';

import { todoThunks, todoActions } from '~store/todo';
import { ImportantEnum, TodoDTO } from '~types/todo.types';
import { iconPickerImportantFilter } from '~utils/iconPickerImportantFilter';
import { clearFormHandler } from './clearFormHandler';
import { dropdownAnimation } from './dropdownAnimation';
import { getPriorityButtons } from './getPriorityButtons';

export class TodoFormState {
  public logoLetterWidth = 35;
  public filtersEndScale = 1;
  public filtersEndHeight = 110;

  filter: boolean;
  formValue: string;
  titleColor: string;
  editingInput: string;
  editingTodos: TodoDTO[];
  isEditingMode: boolean;
  priorityDropdown: boolean;
  listScrollY: Animated.Value;
  letterWidth: Animated.Value;
  isDeleteModalOpened: boolean;
  scrollAnimatedOffset: number;
  filtersHeight: Animated.Value;
  chosenPriority: ImportantEnum | null;
  letterScaleAndOpacity: Animated.Value;
  filtersScaleAndOpacity: Animated.Value;
  dispatch: Dispatch<unknown>;
  setTitleColor: () => void;
  setFilter: (arg: SetStateAction<boolean>) => void;
  setChosenPriority: (arg: ImportantEnum | null) => void;
  setFormValue: React.Dispatch<React.SetStateAction<string>>;
  setPriorityDropdown: React.Dispatch<React.SetStateAction<boolean>>;

  constructor(params: Record<string, any>) {
    this.filter = params.filter;
    this.formValue = params.formValue;
    this.titleColor = params.titleColor;
    this.editingInput = params.editingInput;
    this.letterWidth = params.letterWidth;
    this.listScrollY = params.listScrollY;
    this.editingTodos = params.editingTodos;
    this.filtersHeight = params.filtersHeight;
    this.isEditingMode = params.isEditingMode;
    this.chosenPriority = params.chosenPriority;
    this.priorityDropdown = params.priorityDropdown;
    this.isDeleteModalOpened = params.isDeleteModalOpened;
    this.scrollAnimatedOffset = params.scrollAnimatedOffset;
    this.letterScaleAndOpacity = params.letterScaleAndOpacity;
    this.filtersScaleAndOpacity = params.filtersScaleAndOpacity;
    this.dispatch = params.dispatch;
    this.setFilter = params.setFilter;
    this.setTitleColor = params.setTitleColor;
    this.setFormValue = params.setFormValue;
    this.setChosenPriority = params.setChosenPriority;
    this.setPriorityDropdown = params.setPriorityDropdown;
  }

  get isMultipleEditing() {
    return this.editingTodos.length > 1 && this.isEditingMode;
  }

  get isSaveButtonShouldBeShown() {
    return !this.isMultipleEditing && !this.editingTodos[0]?.completed && this.isEditingMode;
  }

  get todoPriority() {
    return this.editingTodos[0]?.important;
  }

  get currentTodoPriority() {
    return this.isEditingMode ? iconPickerImportantFilter(this.todoPriority) : undefined;
  }

  get allPriorityButtons() {
    return this.isEditingMode
      ? getPriorityButtons(this.setPriorityDropdown, this.setChosenPriority)
      : undefined;
  }

  get filteredPriorityButtonsInEditMode() {
    return this.allPriorityButtons!.filter(
      (btn) =>
        btn.name !==
        (this.chosenPriority !== null
          ? iconPickerImportantFilter(this.chosenPriority)
          : this.currentTodoPriority),
    );
  }

  get nonChosenPriorityButtons() {
    return this.isEditingMode ? this.filteredPriorityButtonsInEditMode : undefined;
  }

  setPriorityDropdownToggle() {
    this.setPriorityDropdown(!this.priorityDropdown);
  }

  addHandler = () => {
    if (this.formValue) {
      this.dispatch(todoThunks.todoAddThunk({ userId: 1, title: this.formValue }));
      clearFormHandler(this.setFormValue, this.setChosenPriority, null);
    }
  };

  changeHandler = () => {
    this.dispatch(
      todoThunks.todoChangeThunk(
        this.editingTodos[0]!.id,
        this.editingInput,
        this.chosenPriority !== null ? this.chosenPriority : this.todoPriority,
      ),
    );
    clearFormHandler(this.setFormValue, this.setChosenPriority, null);
  };

  cancelAllHandler = () => {
    this.dispatch(todoActions.todoEditModeOff());
    this.dispatch(todoActions.todoEditDeleteModalModeOn(false));
    clearFormHandler(this.setFormValue, this.setChosenPriority, null);
  };

  deleteHandler = () => {
    this.dispatch(todoThunks.todoDeleteThunk(this.editingTodos));
    this.dispatch(todoActions.todoEditDeleteModalModeOn(false));
    clearFormHandler(this.setFormValue, this.setChosenPriority, null);
  };

  selectAllHandler = () => {
    this.dispatch(todoActions.todoSelectAll());
  };

  onFilterClickHandler = () => {
    dropdownAnimation(
      this.filter,
      this.filtersHeight,
      this.filtersEndHeight,
      this.filtersScaleAndOpacity,
      this.filtersEndScale,
      this.setFilter,
    );
  };

  todoEditDeleteModalModeOn = () => {
    this.dispatch(todoActions.todoEditDeleteModalModeOn(true));
  };
}
