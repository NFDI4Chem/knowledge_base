import React from "react";
import Link from "@docusaurus/Link";

import styles from "@site/src/css/DecisionTree.module.css";

const DecisionTree = () => {
  return (
    <React.Fragment>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 85 1280 512"
      >
        <g id="headbox">
          <path
            className={styles.svgBlueBox}
            d="M22.9,104.4h1234.2c5.9,0,10.8,4.5,10.8,10v38c0,5.5-4.9,10-10.8,10H22.9c-5.9,0-10.8-4.5-10.8-10v-38c0-5.5,4.9-10,10.8-10Z"
          />
          <text
            className={styles.svgHeadBoxText}
            transform="translate(429.9 144.5)"
          >
            <tspan x="0" y="0">
              What type of data do you have?
            </tspan>
          </text>
        </g>

        <g id="intermolecular_supra" className={styles.hoverGroup}>
          <line
            className={styles.svgLine}
            x1="71.8"
            y1="162.7"
            x2="71.8"
            y2="504.4"
          />
          <path
            id="path234-3"
            className={styles.svgDescBox}
            d="M23.8,180.4h171.1c6.4,0,11.7,6.6,11.7,14.6v98c0,8-5.3,14.6-11.7,14.6H23.8c-6.4,0-11.7-6.6-11.7-14.6v-98c0-8,5.3-14.6,11.7-14.6Z"
          />
          <text
            className={styles.svgDescText}
            transform="translate(32.9 218.4)"
          >
            <tspan x="0" y="0">
              intermolecular and
            </tspan>
            <tspan x="13.2" y="21.6">
              supramolecular
            </tspan>
            <tspan x="18.4" y="43.2">
              interactions of
            </tspan>
            <tspan x=".3" y="64.8">
              molecular systems
            </tspan>
          </text>
          <Link className={styles.svglink} to="/docs/suprabank">
            <path
              id="path332"
              className={styles.svgBlueBox}
              d="M23.8,504.1h95.9c6.4,0,11.7,6.2,11.7,13.8v37.3c0,7.6-5.3,13.8-11.7,13.8H23.8c-6.4,0-11.7-6.2-11.7-13.8v-37.3c0-7.6,5.3-13.8,11.7-13.8Z"
            />
            <text
              className={styles.svgBlueBoxText}
              transform="translate(18 544.3)"
            >
              <tspan x="0" y="0">
                SupraBank
              </tspan>
            </text>
          </Link>
        </g>

        <g id="enzyme_strenda" className={styles.hoverGroup}>
          <line
            className={styles.svgLine}
            x1="231.9"
            y1="162.7"
            x2="231.9"
            y2="504.4"
          />
          <path
            className={styles.svgDescBox}
            d="M148.4,361.3h167c6.4,0,11.6,5.6,11.6,12.4v29.9c0,6.8-5.2,12.4-11.6,12.4h-167c-6.4,0-11.6-5.6-11.6-12.4v-29.9c0-6.8,5.2-12.4,11.6-12.4Z"
          />

          <text
            className={styles.svgDescText}
            transform="translate(146.8 395.3)"
          >
            <tspan x="0" y="0">
              enzyme kinetics data
            </tspan>
          </text>
          <Link to="/docs/strenda_db" className={styles.svglink}>
            <path
              id="path332-2"
              data-name="path332"
              className={styles.svgBlueBox}
              d="M183.1,504.1h97.6c6.5,0,11.9,6.2,11.9,13.8v37.3c0,7.6-5.4,13.8-11.9,13.8h-97.6c-6.5,0-11.9-6.2-11.9-13.8v-37.3c0-7.6,5.4-13.8,11.9-13.8Z"
            />
            <text
              className={styles.svgBlueBoxText}
              transform="translate(184.3 531.7)"
            >
              <tspan x="0" y="0">
                STRENDA
              </tspan>
              <tspan x="33.4" y="25.2">
                DB
              </tspan>
            </text>
          </Link>
        </g>

        <g id="multi_radar" className={styles.hoverGroup}>
          <line
            className={styles.svgLine}
            x1="380.5"
            y1="162.7"
            x2="380.5"
            y2="504.4"
          />
          <path
            className={styles.svgDescBox}
            d="M292.8,210.8h175.4c6.7,0,12.2,6.8,12.2,15.2v36.4c0,8.3-5.5,15.2-12.2,15.2h-175.4c-6.7,0-12.2-6.8-12.2-15.2v-36.4c0-8.3,5.5-15.2,12.2-15.2Z"
          />
          <text
            className={styles.svgDescText}
            transform="translate(313.4 250.8)"
          >
            <tspan x="0" y="0">
              multidisciplinary
            </tspan>
          </text>
          <Link to="/docs/radar4chem" className={styles.svglink}>
            <path
              id="path332-3"
              data-name="path332"
              className={styles.svgBlueBox}
              d="M317.5,504.1h126c8.4,0,15.4,6.2,15.4,13.8v37.3c0,7.6-6.9,13.8-15.4,13.8h-126c-8.4,0-15.4-6.2-15.4-13.8v-37.3c0-7.6,6.9-13.8,15.4-13.8Z"
            />
            <text
              className={styles.svgBlueBoxText}
              transform="translate(310.8 544.3)"
            >
              <tspan x="0" y="0">
                RADAR4Chem
              </tspan>
            </text>
          </Link>
        </g>

        <g id="simul_nomad" className={styles.hoverGroup}>
          <line
            className={styles.svgLine}
            x1="529.2"
            y1="162.7"
            x2="529.2"
            y2="504.4"
          />

          <path
            className={styles.svgDescBox}
            d="M449.2,363.4h159.9c6.1,0,11.1,5.6,11.1,12.4v29.9c0,6.8-5,12.4-11.1,12.4h-159.9c-6.1,0-11.1-5.6-11.1-12.4v-29.9c0-6.8,5-12.4,11.1-12.4Z"
          />

          <text
            className={styles.svgDescText}
            transform="translate(482.4 397.4)"
          >
            <tspan x="0" y="0">
              simulations
            </tspan>
          </text>

          <Link to="/docs/nomad" className={styles.svglink}>
            <path
              id="path332-4"
              data-name="path332"
              className={styles.svgBlueBox}
              d="M485.9,504.1h86.4c5.8,0,10.5,6.2,10.5,13.8v37.3c0,7.6-4.7,13.8-10.5,13.8h-86.4c-5.8,0-10.5-6.2-10.5-13.8v-37.3c0-7.6,4.7-13.8,10.5-13.8Z"
            />
            <text
              className={styles.svgBlueBoxText}
              transform="translate(491.3 544.3)"
            >
              <tspan x="0" y="0">
                NOMAD
              </tspan>
            </text>
          </Link>
        </g>

        <g id="orginorg_csd" className={styles.hoverGroup}>
          <line
            className={styles.svgLine}
            x1="646.5"
            y1="162.7"
            x2="646.5"
            y2="504.4"
          />

          <path
            className={styles.svgDescBox}
            d="M551.4,184.4h184.2c6.9,0,12.6,6.2,12.6,13.7v91.9c0,7.5-5.7,13.7-12.6,13.7h-184.2c-6.9,0-12.6-6.2-12.6-13.7v-91.9c0-7.5,5.7-13.7,12.6-13.7Z"
          />

          <text
            className={styles.svgDescText}
            transform="translate(562.8 218.4)"
          >
            <tspan x="0" y="0">
              crystal structures of
            </tspan>
            <tspan x="-9" y="21.6">
              molecular organic and
            </tspan>
            <tspan x="1" y="43.2">
              molecular inorganic
            </tspan>
            <tspan x="32" y="64.8">
              compounds
            </tspan>
          </text>

          <Link to="/docs/csd_icsd" className={styles.svglink}>
            <path
              id="path332-5"
              data-name="path332"
              className={styles.svgBlueBox}
              d="M615.8,504.1h58.6c3.9,0,7.1,6.2,7.1,13.8v37.3c0,7.6-3.2,13.8-7.1,13.8h-58.6c-3.9,0-7.1-6.2-7.1-13.8v-37.3c0-7.6,3.2-13.8,7.1-13.8Z"
            />
            <text
              className={styles.svgBlueBoxText}
              transform="translate(624.7 544.3)"
            >
              <tspan x="0" y="0">
                CSD
              </tspan>
            </text>
          </Link>
        </g>

        <g id="inorg_icsd" className={styles.hoverGroup}>
          <line
            className={styles.svgLine}
            x1="902.2"
            y1="162.7"
            x2="902.2"
            y2="504.4"
          />

          <path
            id="path242"
            className={styles.svgDescBox}
            d="M830.5,205h151.9c5.7,0,10.4,5.3,10.4,11.7v54.8c0,6.4-4.7,11.7-10.4,11.7h-151.9c-5.7,0-10.4-5.3-10.4-11.7v-54.8c0-6.4,4.7-11.7,10.4-11.7Z"
          />
          <text className={styles.svgDescText} transform="translate(840.1 240)">
            <tspan x="0" y="0">
              inorganic crystal
            </tspan>
            <tspan x="25" y="21.6">
              structures
            </tspan>
          </text>
          <Link to="/docs/csd_icsd" className={styles.svglink}>
            <path
              id="path332-7"
              data-name="path332"
              className={styles.svgBlueBox}
              d="M870.8,504.1h58.6c3.9,0,7.1,6.2,7.1,13.8v37.3c0,7.6-3.2,13.8-7.1,13.8h-58.6c-3.9,0-7.1-6.2-7.1-13.8v-37.3c0-7.6,3.2-13.8,7.1-13.8Z"
            />
            <text
              className={styles.svgBlueBoxText}
              transform="translate(875.2 544.3)"
            >
              <tspan x="0" y="0">
                ICSD
              </tspan>
            </text>
          </Link>
        </g>

        <g id="chemotion_nmrxiv" className={styles.hoverGroup}>
          <line
            className={styles.svgLine}
            x1="1024.7"
            y1="162.7"
            x2="1024.7"
            y2="504.4"
          />
          <path
            id="path256"
            className={styles.svgDescBox}
            d="M924.4,315.8h172.9c6.5,0,11.8,5.2,11.8,11.5v128.7c0,6.3-5.3,11.5-11.8,11.5h-172.9c-6.5,0-11.8-5.2-11.8-11.5v-128.7c0-6.3,5.3-11.5,11.8-11.5Z"
          />
          <text className={styles.svgDescText} transform="translate(931 355.2)">
            <tspan x="0" y="0">
              molecules and their
            </tspan>
            <tspan x="35.6" y="21.6">
              properties,
            </tspan>
            <tspan x="-15.2" y="43.2">
              identification, reactions
            </tspan>
            <tspan x="9" y="64.8">
              and experimental
            </tspan>
            <tspan x="23.8" y="86.4">
              investigations
            </tspan>
          </text>

          <line
            className={styles.svgLine}
            x1="1221"
            y1="162.7"
            x2="1221"
            y2="504.4"
          />
          <line
            className={styles.svgLine}
            x1="1123.5"
            y1="162.7"
            x2="1123.5"
            y2="504.4"
          />

          <path
            id="path294"
            className={styles.svgDescBox}
            d="M1082.9,207.5h173.2c6.5,0,11.9,4.9,11.9,10.9v51.3c0,6-5.3,10.9-11.9,10.9h-173.2c-6.5,0-11.9-4.9-11.9-10.9v-51.3c0-6,5.3-10.9,11.9-10.9Z"
          />
          <text
            className={styles.svgDescText}
            transform="translate(1099.7 240)"
          >
            <tspan x="0" y="0">
              nuclear magnetic
            </tspan>
            <tspan x="0" y="21.6">
              resonance (NMR)
            </tspan>
          </text>

          <Link to="/docs/chemotion_repository" className={styles.svglink}>
            <path
              id="path332-8"
              data-name="path332"
              className={styles.svgBlueBox}
              d="M981.9,504.1h149.7c10,0,18.3,6.2,18.3,13.8v37.3c0,7.6-8.2,13.8-18.3,13.8h-149.7c-10,0-18.3-6.2-18.3-13.8v-37.3c0-7.6,8.2-13.8,18.3-13.8Z"
            />
            <text
              className={styles.svgBlueBoxText}
              transform="translate(1003.9 531.7)"
            >
              <tspan x="0" y="0">
                Chemotion
              </tspan>
              <tspan x=".3" y="25.2">
                Repository
              </tspan>
            </text>
          </Link>
          <Link to="/docs/nmrxiv" className={styles.svglink}>
            <path
              id="path332-9"
              data-name="path332"
              className={styles.svgBlueBox}
              d="M1183.3,504.1h75.4c5.1,0,9.2,6.2,9.2,13.8v37.3c0,7.6-4.1,13.8-9.2,13.8h-75.4c-5.1,0-9.2-6.2-9.2-13.8v-37.3c0-7.6,4.1-13.8,9.2-13.8Z"
            />
            <text
              className={styles.svgBlueBoxText}
              transform="translate(1186.1 544.3)"
            >
              <tspan x="0" y="0">
                nmrXiv
              </tspan>
            </text>
          </Link>
        </g>

        <g id="mass_spectra" className={styles.hoverGroup}>
          <line
            className={styles.svgLine}
            x1="779.5"
            y1="162.7"
            x2="779.5"
            y2="504.4"
          />

          <path
            id="path294-2"
            data-name="path294"
            className={styles.svgDescBox}
            d="M683.2,350.1h183.6c6.9,0,12.6,5.6,12.6,12.4v58.4c0,6.8-5.7,12.4-12.6,12.4h-183.6c-6.9,0-12.6-5.6-12.6-12.4v-58.4c0-6.8,5.7-12.4,12.6-12.4Z"
          />
          <text
            className={styles.svgDescText}
            transform="translate(697.1 387.6)"
          >
            <tspan x="0" y="0">
              mass spectrometry
            </tspan>
            <tspan x="6.5" y="21.6">
              reference spectra
            </tspan>
          </text>

          <Link to="/docs/massbank_eu" className={styles.svglink}>
            <path
              id="path332-6"
              data-name="path332"
              className={styles.svgBlueBox}
              d="M718.1,504.1h113.7c7.6,0,13.9,6.2,13.9,13.8v37.3c0,7.6-6.2,13.8-13.9,13.8h-113.7c-7.6,0-13.9-6.2-13.9-13.8v-37.3c0-7.6,6.2-13.8,13.9-13.8Z"
            />
            <text
              className={styles.svgBlueBoxText}
              transform="translate(709.1 544.3)"
            >
              <tspan x="0" y="0">
                MassBank EU
              </tspan>
            </text>
          </Link>
        </g>
      </svg>
    </React.Fragment>
  );
};

export default DecisionTree;
