
      function  getOptions() {
      
		  return {
			
			layout: {
				randomSeed: 10,
				improvedLayout:false
			},


			physics: {
			  solver: 'forceAtlas2Based',
			  maxVelocity: 10,
			  minVelocity: 1,
			},


			groups: {
			  property: {
				shape: 
				  'dot'
				,
				size: 18,
				color: 'pink'
			  },
			  
			    
          Education: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-graduation-cap',
              code: '\uf19d',
              size: 50,
              color: 'brown'
            }
          },
          EducationalOrganization: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-graduation-cap',
              code: '\uf19d',
              size: 50,
              color: 'black'
            }
          },
          Public_university: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-graduation-cap',
              code: '\uf19d',
              size: 50,
              color: 'blue'
            }
          },
          Job: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-magic',
              code: '\uf0d0',
              size: 50,
              color: 'black'
            }
          },
          WorkHistory: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-magic',
              code: '\uf0d0',
              size: 50,
              color: 'YellowGreen'
            }
          },
          
          
          Person: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              code: '\uf007',
              size: 50,
              color: '#aa00ff'
            }
          },
          BusinessPerson: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              code: '\uf007',
              size: 50,
              color: '#aa00ff'
            }
          },
          Group: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-users',
              code: '\uf0c0',
              size: 50,
              color: '#57169a'
            }
          },
          Organization: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-users',
              code: '\uf0c0',
              size: 45,
              color: 'blue'
            }
          },   
          Company: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-building-0',
              code: '\uf0f7',
              size: 50,
              color: 'OrangeRed '
            }
          },
          Government: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-building',
              code: '\uf1ad',
              size: 45,
              color: 'black'
            }
          },
          GovernmentAgency: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-building',
              code: '\uf1ad',
              size: 45,
              color: 'black'
            }
          },
          Municipality: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-building',
              code: '\uf1ad',
              size: 40,
              color: 'RoyalBlue'
            }
          },
          Legislature: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              code: '\uf19c',
              size: 45,
              color: 'grey'
            }
          },
          NonProfit: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-users',
              code: '\uf0c0',
              size: 50,
              color: 'green'
            }
          },
          NonProfitOrganisation: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-users',
              code: '\uf0c0',
              size: 50,
              color: 'green'
            }
          },
          NGO: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-users',
              code: '\uf0c0',
              size: 50,
              color: 'pink'
            }
          },
          Faith: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              code: '\uf004',
              size: 40,
              color: 'cyan'
            }
          },
          ReligiousOrganisation: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              code: '\uf004',
              size: 40,
              color: 'cyan'
            }
          },
          City: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-map-marker ',
              code: '\uf041',
              size: 60,
              color: 'black'
            }
          },
          Village: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-map-marker ',
              code: '\uf041',
              size: 50,
              color: 'Grey'
            }
          },
          Town: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-map-marker ',
              code: '\uf041',
              size: 45,
              color: 'LightGrey'
            }
          },
          Role: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              code: '\uf21d',
              size: 55,
              color: '#6E6EFD'
            }
          },
          
          Place: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-map-marker ',
              code: '\uf041',
              size: 55,
              color: 'blue'
            }
          },
          Tags: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-tags',
              code: '\uf02c',
              size: 50,
              color: 'YellowGreen'
            }
          },
          Tag: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-tag',
              code: '\uf02b',
              size: 40,
              color: 'YellowGreen'
            }
          },     
          ConceptScheme: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-tags',
              code: '\uf02c',
              size: 50,
              color: 'YellowGreen'
            }
          },
          Concept: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-tag',
              code: '\uf02b',
              size: 40,
              color: 'YellowGreen'
            }
          },     
          
          Perse: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-tags',
              code: '\uf02c',
              size: 40,
              color: 'OrangeRed'
            }
          },
          Personality: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-tag',
              code: '\uf02b',
              size: 40,
              color: 'OrangeRed'
            }
          },
          MBTI: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-tag',
              code: '\uf02b',
              size: 40,
              color: 'Green'
            }
          },
          MBTI_profile: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-tag',
              code: '\uf02b',
              size: 40,
              color: 'Green'
            }
          },
          DiSC: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-tag',
              code: '\uf02b',
              size: 40,
              color: 'Green'
            }
          },
          Traxion: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-tag',
              code: '\uf02b',
              size: 40,
              color: 'Green'
            }
          },
          
          Interest: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-search',
              code: '\uf002',
              size: 50,
              color: 'OrangeRed'
            }
          },
          Skill: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-tag',
              code: '\uf02b',
              size: 40,
              color: 'OrangeRed'
            }
          },
          Knowledge: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-tag',
              code: '\uf02b',
              size: 40,
              color: 'OrangeRed'
            }
          },
          Experience: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              name: 'fa-tag',
              code: '\uf02b',
              size: 40,
              color: 'OrangeRed'
            }
          },
          
			  group: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf0c0',
				  size: 50,
				  color: '#57169a'
				}
			  },
			  
			  team: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf007',
				  size: 50,
				  color: 'grey'
				}
			  },
			  person: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf007',
				  size: 50,
				  color: '#aa00ff'
				}
			  },
			  
			  role: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf21d',
				  size: 50,
				  color: '#6E6EFD'
				}
			  },


			  organization: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf0e8',
				  size: 50,
				  color: 'blue'
				}
			  },   
			  orgbiz: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf069',
				  size: 50,
				  color: '#57169a'
				}
			  },
			  
			  orggov: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf19c',
				  size: 50,
				  color: 'blue'
				}
			  },
			  
			  orgnonprofit: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf069',
				  size: 50,
				  color: 'green'
				}
			  },
			  
			  
			  orgfaith: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf004',
				  size: 50,
				  color: 'cyan'
				}
			  },
			  
			  globe: {
				shape: 'icon',
				icon: {
				  face: 'Ionicons',
				  code: '\uf276',
				  size: 66,
				  color: '#6E6EFD'
				}
			  },
			  
			  marker: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf041',
				  size: 50,
				  color: '#FB7E81'
				}
			  },
			  
			  book: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf02d',
				  size: 50,
				  color: '#C2FABC'
				}
			  },
			  film: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf008',
				  size: 55,
				  color: '#6E6EFD'
				}
			  },
			  
			  
			  tags: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf02c',
				  size: 40,
				  color: 'lime'
				}
			  },
			  tag: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf02b',
				  size: 40,
				  color: 'lime'
				}
			  },
			  
			  projects: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf0ae',
				  size: 44,
				  color: '#800000'
				}
			  },
			  project: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf03a',
				  size: 40,
				  color: 'maroon'
				}
			  },
			  
			  bullseye: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf140',
				  size: 40,
				  color: 'red'
				}
			  },
			  puzzle: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf12e',
				  size: 40,
				  color: 'yellow'
				}
			  },
			  
			  cubes: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf1b3',
				  size: 44,
				  color: 'black'
				}
			  },
			  cube: {
				shape: 'icon',
				icon: {
				  face: 'FontAwesome',
				  code: '\uf1b2',
				  size: 40,
				  color: 'black'
				}
			  },
			}        
		}
      
    };
