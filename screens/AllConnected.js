import * as React from "react"
import Svg, { Path, G, Defs, ClipPath } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const SvgComponent = (props) => (
  <Svg
    width={408}
    height={288}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path fill="#1E1E1E" d="M0 0h408v288H0z" />
    <Path fill="#fff" d="M0 0h408v288H0z" />
    <Path
      d="M182.158 75.486S182.103 77 183.415 77c1.632 0 15.124-.02 15.124-.02l.023-13.988s-.214-2.304 1.766-2.304h6.278c2.344 0 2.2 2.304 2.2 2.304l-.027 13.944h14.806c1.664 0 1.589-1.884 1.589-1.884V49.26l-20.867-20.946-22.149 20.949v26.224Z"
      fill="#008EC5"
    />
    <Path
      d="M174 47.312s1.878 3.91 5.982 0l24.511-23.404 22.98 23.258c4.747 3.864 6.527 0 6.527 0L204.493 17 174 47.312ZM226.913 23.854h-5.909l.025 8.09 5.884 5.638V23.854Z"
      fill="#008EC5"
    />
    <G filter="url(#a)" fill="#008EC5">
      <Path d="M71.536 184H65v-4H53v4h-6.536A3.468 3.468 0 0 0 43 187.464v49.072A3.468 3.468 0 0 0 46.464 240h25.071A3.468 3.468 0 0 0 75 236.536v-49.072A3.468 3.468 0 0 0 71.536 184ZM73 236.536c0 .808-.657 1.464-1.464 1.464H46.464A1.465 1.465 0 0 1 45 236.536v-49.072c0-.808.657-1.464 1.464-1.464H71.536c.807 0 1.464.656 1.464 1.464v49.072Z" />
      <Path d="M66 209h-3v-11.892a1.052 1.052 0 0 0-.236-.72c-.381-.467-1.264-.463-1.642.004a.858.858 0 0 0-.072.103l-9.9 15.979A.999.999 0 0 0 52 214h4l.002 12.929h.001c.001.235.077.479.215.657.189.247.529.414.84.414.305 0 .636-.16.825-.398.04-.05.074-.103.104-.159l8.899-16.979A1.002 1.002 0 0 0 66 209Z" />
    </G>
    <G clipPath="url(#b)" filter="url(#c)">
      <Path
        d="M361.476 236.685a2.662 2.662 0 1 0 0-5.324h-9.053v-10.296h14.915a2.662 2.662 0 0 0 2.54-3.46l-7.772-31.089a2.662 2.662 0 0 0-2.583-2.016h-39.051a2.661 2.661 0 0 0-2.582 2.016l-7.811 31.241a2.663 2.663 0 0 0 2.583 3.308h14.911v10.296h-9.053a2.662 2.662 0 0 0 0 5.324h42.956Zm-41.404-36.945h17.264v4.812h-18.468l1.204-4.812Zm22.588 0h17.264l1.203 4.812H342.66v-4.812Zm15.933-5.324H342.66v-4.592h14.785l1.148 4.592Zm-21.257-4.592v4.592h-15.933l1.148-4.592h14.785Zm-21.264 25.917 1.466-5.865h19.798v5.865h-21.264Zm31.027 15.62h-14.202v-10.296h14.202v10.296Zm-4.439-15.62v-5.865h19.798l1.466 5.865H342.66Z"
        fill="#008EC5"
      />
    </G>
    <Path
      stroke="green"
      strokeWidth={3}
      d="M202.5 84v55M200 138.5h140M339.5 137v36"
    />
    <Path
      transform="rotate(179.595 100.256 68.858) skewX(-.087)"
      stroke="green"
      strokeWidth={3}
      d="M0-1.5h140"
    />
    <Path stroke="green" strokeWidth={3} d="M60.5 138v36" />
    <Defs>
      <ClipPath id="b">
        <Path fill="#fff" transform="translate(310 177)" d="M0 0h60v60H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SvgComponent
