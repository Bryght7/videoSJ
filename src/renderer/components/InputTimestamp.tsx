import { KeyboardEvent, useState } from 'react';

type Props = {
  initialValue?: string;
  eventProp: () => void;
};

const replaceAt = (str: string, index: number, replacement: string) =>
  str.substring(0, index) +
  replacement +
  str.substring(index + replacement.length);

const deleteCharacter = (source: string, at: number) => {
  // if "12:34:56.789" deleting at "5", then initial array is "12:34:"
  const newStringArray = Array.from(source).map((e, i) => (i >= at ? '' : e));
  for (let i = at + 1; i < 12; i++) {
    if (source.charAt(i) !== ':' && source.charAt(i) !== '.') {
      newStringArray[i - 1] = source.charAt(i);
    } else {
      newStringArray[i - 1] = source.charAt(i + 1);
      newStringArray[i] = source.charAt(i);
      i += 1;
    }
  }
  // replace all empty strings with zeros, and convert back to string
  return newStringArray.map((e) => (e === '' ? '0' : e)).join('');
};

const InputTimestamp = ({
  initialValue = '00:00:00.000',
  eventProp,
}: Props) => {
  const [value, setValue] = useState(initialValue);

  const handleKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement;
    if (
      event.key === 'Backspace' &&
      target.selectionStart !== null &&
      target.selectionStart > 0
    ) {
      event.preventDefault();
      if (
        target.selectionStart === 3 ||
        target.selectionStart === 6 ||
        target.selectionStart === 9
      ) {
        // if trying to erase a ":" or ".", go to previous caret position and continue
        target.setSelectionRange(
          target.selectionStart - 1,
          target.selectionStart - 1
        );
      }
      const caretPosition = target.selectionStart; // remember caret position
      setValue(replaceAt(value, target.selectionStart - 1, '0')); // overwrite previous character
      setTimeout(() => {
        // move caret to previous character
        target.setSelectionRange(caretPosition - 1, caretPosition - 1);
      });
    } else if (
      event.key === 'Delete' &&
      target.selectionStart !== null &&
      target.selectionStart < 12
    ) {
      // if not deleting at the end
      if (
        target.selectionStart === 2 ||
        target.selectionStart === 5 ||
        target.selectionStart === 8
      ) {
        // if trying to delete a ":" or ".", go to next caret position and continue
        target.setSelectionRange(
          target.selectionStart + 1,
          target.selectionStart + 1
        );
      }
      const caretPosition = target.selectionStart; // remember caret position
      setValue(deleteCharacter(value, caretPosition));
      setTimeout(() => {
        // move caret to next character
        target.setSelectionRange(caretPosition, caretPosition);
      });
      event.preventDefault();
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (Number.isNaN(parseInt(event.key, 10))) {
      event.preventDefault();
      return;
    }
    if (target.selectionStart !== null && target.selectionStart < 12) {
      // if not writing at the very end
      if (
        target.selectionStart === 2 ||
        target.selectionStart === 5 ||
        target.selectionStart === 8
      ) {
        // if trying to write at ":" or ".", go to next caret position and continue
        target.setSelectionRange(
          target.selectionStart + 1,
          target.selectionStart + 1
        );
      }
      const caretPosition = target.selectionStart; // remember caret position
      setValue(replaceAt(value, target.selectionStart, event.key)); // overwrite next character
      setTimeout(() => {
        // move caret to next character
        target.setSelectionRange(caretPosition + 1, caretPosition + 1);
      });
      event.preventDefault();
    }
  };

  return (
    <input
      type="text"
      maxLength={12}
      value={value}
      onKeyPress={handleKeyPress}
      onKeyDown={handleKeyDown}
    />
  );

  // TODO: implement onChange cascading event to parent, seek video to value
};

export default InputTimestamp;
