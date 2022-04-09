import { KeyboardEvent, useEffect, useState } from 'react';

type Props = {
  seconds: number;
  maxLength?: number;
  disabled?: boolean;
  onChange: (seconds: number) => void;
  invalid?: boolean;
  invalidTitle?: string;
};

const replaceAt = (str: string, index: number, replacement: string) =>
  str.substring(0, index) +
  replacement +
  str.substring(index + replacement.length);

const deleteCharacter = (source: string, at: number) => {
  // if deleting at "5" from source "12:34:56.789", then initial array will be "12:34:"
  const newStringArray = Array.from(source).map((e, i) => (i >= at ? '' : e));
  // basically erase 1 character then shift all next characters to cursor, while keeping the ":" and "."
  for (let i = at + 1; i < 12; i++) {
    if (source.charAt(i) !== ':' && source.charAt(i) !== '.') {
      newStringArray[i - 1] = source.charAt(i);
    } else {
      newStringArray[i - 1] = source.charAt(i + 1);
      newStringArray[i] = source.charAt(i);
      i += 1;
    }
  }
  // filling any empty ending with zeros, and return string
  return newStringArray.map((e) => (e === '' ? '0' : e)).join('');
};

const secondsToTimestamp = (seconds: number) => {
  const hh = Math.floor(seconds / 60 / 60);
  const mm = Math.floor(seconds / 60) - hh * 60;
  const ss = Math.floor(seconds % 60);
  const ms = seconds.toString().split('.')[1] || '0';
  return `${hh.toString().padStart(2, '0')}:${mm
    .toString()
    .padStart(2, '0')}:${ss.toString().padStart(2, '0')}.${ms
    .padEnd(3, '0')
    .substring(0, 3)}`;
};

const timestampToSeconds = (timestamp: string) => {
  const hh: string = timestamp.split(':')[0];
  const mm: string = timestamp.split(':')[1];
  const ss: string = timestamp.split(':')[2].split('.')[0];
  const ms: string = timestamp.split(':')[2].split('.')[1];
  return (
    parseInt(hh, 10) * 60 * 60 +
    parseInt(mm, 10) * 60 +
    parseInt(ss, 10) +
    parseInt(ms, 10) / 1000
  );
};

const InputTimestamp = ({
  seconds,
  maxLength,
  disabled = false,
  onChange,
  invalid = false,
  invalidTitle = undefined,
}: Props) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(`${secondsToTimestamp(seconds)}`);
  }, [seconds]);

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
      const newValue = replaceAt(value, target.selectionStart - 1, '0');
      setValue(newValue); // overwrite previous character
      onChange(timestampToSeconds(newValue));
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
      event.preventDefault();
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
      const newValue = deleteCharacter(value, caretPosition);
      setValue(newValue);
      onChange(timestampToSeconds(newValue));
      setTimeout(() => {
        // move caret to next character
        target.setSelectionRange(caretPosition, caretPosition);
      });
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
      event.preventDefault();
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
      const newValue = replaceAt(value, target.selectionStart, event.key);
      setValue(newValue); // overwrite next character
      onChange(timestampToSeconds(newValue));
      setTimeout(() => {
        // move caret to next character
        target.setSelectionRange(caretPosition + 1, caretPosition + 1);
      });
    }
  };

  let classes =
    'pl-2.5 border rounded-md w-28 focus:outline-none focus-visible:ring disabled:border-gray-400 disabled:text-gray-400 disabled:select-none disabled:cursor-not-allowed';
  if (invalid) {
    classes += ' text-red-600 border-red-500 focus:border-red-700';
  } else {
    classes += ' border-gray-500 focus:border-blue-700';
  }

  return (
    <input
      className={classes}
      type="text"
      title={invalid ? invalidTitle : undefined}
      maxLength={maxLength}
      value={value}
      disabled={disabled}
      onKeyPress={handleKeyPress}
      onKeyDown={handleKeyDown}
    />
  );
};

export default InputTimestamp;
