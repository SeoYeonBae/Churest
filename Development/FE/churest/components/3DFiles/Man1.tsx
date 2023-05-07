import * as THREE from 'three';
import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { glbs } from '@/public/assets/glb';

type GLTFResult = GLTF & {
  nodes: {
    m_6: THREE.SkinnedMesh;
    root: THREE.Bone;
  };
  materials: {
    characters: THREE.MeshStandardMaterial;
  };
};

type ActionName =
  | 'A-pose'
  | 'Idle'
  | 'Run'
  | 'Sad'
  | 'Song Jump'
  | 'Walk'
  | 'Win';
type GLTFActions = Record<ActionName, THREE.AnimationAction>;
type Props = {
  isMoving: boolean;
  charState: string;
};
export function Man1({ isMoving, charState }: Props) {
  const group = useRef<any>();
  const { nodes, materials, animations } = useGLTF(
    glbs.man_1_glb
  ) as GLTFResult;

  const { actions } = useAnimations(animations, group);
  const [nowPlaying, setNowPlaying] = useState('Idle');
  useEffect(() => {
    if (charState == 'Song Jump') {
      actions[charState]?.play();
      setNowPlaying(charState);
    } else if (isMoving) {
      if (nowPlaying != charState) {
        actions[nowPlaying]?.stop();
        actions[charState]?.play();
        setNowPlaying(charState);
      }
    } else {
      actions[nowPlaying]?.stop();
      actions['Idle']?.play();
      setNowPlaying('Idle');
    }
  }, [isMoving, charState]);

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="metarig">
          <group
            name="spine"
            position={[0, 0.32, -0.02]}
            rotation={[0.25, 0, 0]}
          >
            <group name="pelvisL" rotation={[-2.03, -0.82, -2.24]} />
            <group
              name="thighR"
              position={[-0.07, 0.02, 0.01]}
              rotation={[2.74, 0, 0]}
            >
              <group
                name="shinR"
                position={[0, 0.12, 0]}
                rotation={[0.26, 0, 0]}
              >
                <group
                  name="footR"
                  position={[0, 0.18, 0]}
                  rotation={[-1.47, 0, 0]}
                >
                  <group
                    name="toeR"
                    position={[0, 0.1, 0]}
                    rotation={[2.94, 0, -Math.PI]}
                  />
                  <group
                    name="heel02R"
                    position={[0.01, -0.03, 0.04]}
                    rotation={[2.94, 0, Math.PI / 2]}
                  />
                </group>
              </group>
            </group>
            <group name="pelvisR" rotation={[-2.03, 0.82, 2.24]} />
            <group
              name="spine001"
              position={[0, 0.06, 0]}
              rotation={[-0.13, 0, 0]}
            >
              <group
                name="spine002"
                position={[0, 0.05, 0]}
                rotation={[-0.16, 0, 0]}
              >
                <group name="spine003" position={[0, 0.07, 0]}>
                  <group
                    name="shoulderL"
                    position={[0.01, 0.05, 0.03]}
                    rotation={[-1.54, 0, -1.04]}
                  >
                    <group
                      name="upper_armL"
                      position={[0.02, 0.1, -0.03]}
                      rotation={[1.91, 1.14, -2.33]}
                    >
                      <group
                        name="forearmL"
                        position={[0, 0.1, 0]}
                        rotation={[0.28, -0.15, -0.12]}
                      >
                        <group
                          name="handL"
                          position={[0, 0.14, 0]}
                          rotation={[-2.55, 1.42, 2.43]}
                        >
                          <group
                            name="palm01L"
                            position={[-0.03, 0.05, 0]}
                            rotation={[0.09, -0.09, 0.18]}
                          >
                            <group
                              name="thumb01L"
                              position={[-0.01, -0.02, 0.03]}
                              rotation={[-1.29, 1.25, 1.53]}
                            >
                              <group
                                name="thumb02L"
                                position={[0, 0.04, 0]}
                                rotation={[0.11, 0.08, -0.01]}
                              />
                            </group>
                            <group
                              name="f_index01L"
                              position={[0, 0.03, 0]}
                              rotation={[0.31, 0.07, -0.18]}
                            >
                              <group
                                name="f_index02L"
                                position={[0, 0.02, 0]}
                                rotation={[-0.01, 0.07, 0.05]}
                              />
                            </group>
                          </group>
                          <group
                            name="palm02L"
                            position={[-0.01, 0.05, -0.01]}
                            rotation={[0.19, -0.12, -0.04]}
                          >
                            <group
                              name="f_middle01L"
                              position={[0, 0.04, 0]}
                              rotation={[0.2, 0.15, 0.01]}
                            >
                              <group
                                name="f_middle02L"
                                position={[0, 0.02, 0]}
                                rotation={[0, -0.01, 0.01]}
                              />
                            </group>
                          </group>
                          <group
                            name="palm03L"
                            position={[0.01, 0.05, 0]}
                            rotation={[0.13, -0.15, -0.05]}
                          >
                            <group
                              name="f_ring01L"
                              position={[0, 0.04, 0]}
                              rotation={[0.39, 0.07, -0.02]}
                            >
                              <group
                                name="f_ring02L"
                                position={[0, 0.02, 0]}
                                rotation={[-0.14, 0.02, 0]}
                              />
                            </group>
                          </group>
                          <group
                            name="palm04L"
                            position={[0.03, 0.05, 0]}
                            rotation={[0.17, -0.12, -0.28]}
                          >
                            <group
                              name="f_pinky01L"
                              position={[0, 0.04, 0]}
                              rotation={[0.2, 0.04, 0.19]}
                            >
                              <group
                                name="f_pinky02L"
                                position={[0, 0.01, 0]}
                                rotation={[0.04, -0.02, 0.06]}
                              />
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <group
                    name="shoulderR"
                    position={[-0.01, 0.05, 0.03]}
                    rotation={[-1.54, 0, 1.04]}
                  >
                    <group
                      name="upper_armR"
                      position={[-0.02, 0.1, -0.03]}
                      rotation={[1.91, -1.14, 2.33]}
                    >
                      <group
                        name="forearmR"
                        position={[0, 0.1, 0]}
                        rotation={[0.28, 0.15, 0.12]}
                      >
                        <group
                          name="handR"
                          position={[0, 0.14, 0]}
                          rotation={[-2.55, -1.42, -2.43]}
                        >
                          <group
                            name="palm04R"
                            position={[-0.03, 0.05, 0]}
                            rotation={[0.17, 0.12, 0.28]}
                          >
                            <group
                              name="f_pinky01R"
                              position={[0, 0.04, 0]}
                              rotation={[0.2, -0.04, -0.19]}
                            >
                              <group
                                name="f_pinky02R"
                                position={[0, 0.01, 0]}
                                rotation={[0.04, 0.02, -0.06]}
                              />
                            </group>
                          </group>
                          <group
                            name="palm02R"
                            position={[0.01, 0.05, -0.01]}
                            rotation={[0.19, 0.12, 0.04]}
                          >
                            <group
                              name="f_middle01R"
                              position={[0, 0.04, 0]}
                              rotation={[0.2, -0.15, -0.01]}
                            >
                              <group
                                name="f_middle02R"
                                position={[0, 0.02, 0]}
                                rotation={[0, 0.01, -0.01]}
                              />
                            </group>
                          </group>
                          <group
                            name="palm03R"
                            position={[-0.01, 0.05, 0]}
                            rotation={[0.13, 0.15, 0.05]}
                          >
                            <group
                              name="f_ring01R"
                              position={[0, 0.04, 0]}
                              rotation={[0.39, -0.07, 0.02]}
                            >
                              <group
                                name="f_ring02R"
                                position={[0, 0.02, 0]}
                                rotation={[-0.14, -0.02, 0]}
                              />
                            </group>
                          </group>
                          <group
                            name="palm01R"
                            position={[0.03, 0.05, 0]}
                            rotation={[0.09, 0.09, -0.18]}
                          >
                            <group
                              name="thumb01R"
                              position={[0.01, -0.02, 0.03]}
                              rotation={[-1.29, -1.25, -1.53]}
                            >
                              <group
                                name="thumb02R"
                                position={[0, 0.04, 0]}
                                rotation={[0.11, -0.08, 0.01]}
                              />
                            </group>
                            <group
                              name="f_index01R"
                              position={[0, 0.03, 0]}
                              rotation={[0.31, -0.07, 0.18]}
                            >
                              <group
                                name="f_index02R"
                                position={[0, 0.02, 0]}
                                rotation={[-0.01, -0.07, -0.05]}
                              />
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <group
                    name="breastL"
                    position={[0.05, -0.02, -0.02]}
                    rotation={[-1.54, 0, -Math.PI]}
                  />
                  <group
                    name="breastR"
                    position={[-0.05, -0.02, -0.02]}
                    rotation={[-1.54, 0, Math.PI]}
                  />
                  <group
                    name="spine004"
                    position={[0, 0.07, 0]}
                    rotation={[0.41, 0, 0]}
                  >
                    <group
                      name="spine005"
                      position={[0, 0.03, 0]}
                      rotation={[-0.19, 0, 0]}
                    >
                      <group
                        name="spine006"
                        position={[0, 0.02, 0]}
                        rotation={[-0.19, 0, 0]}
                      />
                    </group>
                  </group>
                </group>
              </group>
            </group>
            <group
              name="thighL"
              position={[0.07, 0.02, 0.01]}
              rotation={[2.74, 0, 0]}
            >
              <group
                name="shinL"
                position={[0, 0.12, 0]}
                rotation={[0.26, 0, 0]}
              >
                <group
                  name="footL"
                  position={[0, 0.18, 0]}
                  rotation={[-1.47, 0, 0]}
                >
                  <group
                    name="heel02L"
                    position={[-0.01, -0.03, 0.04]}
                    rotation={[2.94, 0, -Math.PI / 2]}
                  />
                  <group
                    name="toeL"
                    position={[0, 0.1, 0]}
                    rotation={[2.94, 0, Math.PI]}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
        <group name="rig">
          <primitive object={nodes.root} />
          <skinnedMesh
            name="m_6"
            geometry={nodes.m_6.geometry}
            material={materials.characters}
            skeleton={nodes.m_6.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(glbs.man_1_glb);
