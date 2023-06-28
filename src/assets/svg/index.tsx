import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';

const ErrorToastIcon = (props: any) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#a)">
      <Path fill="#fff" fillOpacity={0.01} d="M0 0h16v16H0z" />
      <Path
        d="M8.002 1.334c-3.673 0-6.667 2.994-6.667 6.667 0 3.674 2.994 6.667 6.667 6.667 3.673 0 6.667-2.993 6.667-6.667 0-3.673-2.994-6.667-6.667-6.667Zm2.24 8.2a.503.503 0 0 1 0 .707.495.495 0 0 1-.707 0L8.002 8.708 6.47 10.24c-.1.1-.227.147-.354.147a.495.495 0 0 1-.353-.147.503.503 0 0 1 0-.707l1.533-1.533-1.533-1.533a.503.503 0 0 1 0-.707.503.503 0 0 1 .707 0l1.533 1.533 1.533-1.533a.503.503 0 0 1 .707 0 .503.503 0 0 1 0 .707L8.71 8l1.533 1.533Z"
        fill="#FF3141"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

const SuccessToastIcon = (props: any) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#a)">
      <Path fill="#fff" fillOpacity={0.01} d="M0 0h16v16H0z" />
      <Path
        d="M8.003 1.334c-3.674 0-6.667 2.994-6.667 6.667 0 3.674 2.993 6.667 6.667 6.667 3.673 0 6.666-2.993 6.666-6.667 0-3.673-2.993-6.667-6.666-6.667Zm3.186 5.134-3.78 3.78a.5.5 0 0 1-.706 0L4.816 8.36a.503.503 0 0 1 0-.707.503.503 0 0 1 .707 0l1.533 1.534 3.427-3.427a.503.503 0 0 1 .706 0 .503.503 0 0 1 0 .707Z"
        fill="#00B578"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

const WarningToastIcon = (props: any) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#a)">
      <Path fill="#fff" fillOpacity={0.01} d="M0 0h16v16H0z" />
      <Path
        d="M8.002 1.334c-3.673 0-6.667 2.994-6.667 6.667 0 3.674 2.994 6.667 6.667 6.667 3.673 0 6.667-2.993 6.667-6.667 0-3.673-2.994-6.667-6.667-6.667Zm-.5 4c0-.273.227-.5.5-.5s.5.227.5.5v3.334c0 .273-.227.5-.5.5a.504.504 0 0 1-.5-.5V5.334Zm1.113 5.587a.687.687 0 0 1-.14.22.77.77 0 0 1-.22.14.662.662 0 0 1-.253.053.662.662 0 0 1-.253-.053.77.77 0 0 1-.22-.14.687.687 0 0 1-.14-.22.663.663 0 0 1-.054-.253c0-.087.02-.173.054-.253a.77.77 0 0 1 .14-.22.77.77 0 0 1 .22-.14.667.667 0 0 1 .506 0 .77.77 0 0 1 .22.14c.06.066.107.14.14.22.034.08.054.166.054.253s-.02.173-.054.253Z"
        fill="#FF8F1F"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const InfoToastIcon = (props: any) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#a)">
      <Path fill="#fff" fillOpacity={0.01} d="M0 0h16v16H0z" />
      <Path
        d="M8.003 1.334c-3.674 0-6.667 2.994-6.667 6.667 0 3.674 2.993 6.667 6.667 6.667 3.673 0 6.666-2.993 6.666-6.667 0-3.673-2.993-6.667-6.666-6.667Zm-.5 4c0-.273.226-.5.5-.5.273 0 .5.227.5.5v3.334c0 .273-.227.5-.5.5a.504.504 0 0 1-.5-.5V5.334Zm1.113 5.587a.687.687 0 0 1-.14.22.77.77 0 0 1-.22.14.662.662 0 0 1-.253.053.662.662 0 0 1-.254-.053.77.77 0 0 1-.22-.14.687.687 0 0 1-.14-.22.663.663 0 0 1-.053-.253c0-.087.02-.173.053-.253a.769.769 0 0 1 .14-.22.77.77 0 0 1 .22-.14.667.667 0 0 1 .507 0 .77.77 0 0 1 .22.14.77.77 0 0 1 .14.22c.033.08.053.166.053.253s-.02.173-.053.253Z"
        fill="#2560E5"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const CloseIcon = (props: any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M5.155 4.36a.567.567 0 0 0-.796 0 .567.567 0 0 0 0 .795L8.204 9 4.36 12.845a.567.567 0 0 0 0 .795.567.567 0 0 0 .796 0L9 9.795l3.845 3.845a.567.567 0 0 0 .795 0 .566.566 0 0 0 0-.795L9.795 9l3.845-3.845a.566.566 0 0 0 0-.795.567.567 0 0 0-.795 0L9 8.204 5.155 4.36Z"
      fill="#737373"
    />
  </Svg>
);

export {
  ErrorToastIcon,
  InfoToastIcon,
  WarningToastIcon,
  SuccessToastIcon,
  CloseIcon,
};
