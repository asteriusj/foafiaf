
function  getOptions() {
      
  return {
	

    layout: {
      randomSeed: undefined,
      improvedLayout:true,
    },
  
    // interaction:{
    //   dragNodes:  true,
    //   dragView:  true,
    //   hideEdgesOnDrag:  false,
    //   hideNodesOnDrag:  false,
    //   hover:  true,
    //   hoverConnectedEdges:  true
    // },
    interaction:{hover:true},
    
      
    // keyboard:{
    //   enabled: true,
    // //   speed: {x:10,y:10,zoom:0.02},
    // //   bindToWindow: true,
    //   // multiselect: false,
    //   // navigationButtons: false,
    //   // selectable: true,
    //   // selectConnectedEdges: true,
    //   tooltipDelay: 300,
    //   zoomView: true
    // },
  
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
  	
    	Calendar: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-calendar',
          code: '\uf073',
          size: 50,
          color: 'Navy'
        }
      },
    	Events: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-calendar',
          code: '\uf073',
          size: 50,
          color: 'Navy'
        }
      },
    	Event: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-calendar',
          code: '\uf073',
          size: 50,
          color: 'Navy'
        }
      },
      event: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-calendar-o',
          code: '\uf133',
          size: 45,
          color: 'Navy'
        }
      },
      Note: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-file-o',
          code: '\uf016',
          size: 55,
          color: 'Navy'
        }
      },
      Issue: {
        Issue: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-file-o',
          code: '\uf016',
          size: 50,
          color: 'FFFFA5'
        }
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
          color: 'grey'
        }
      },
      EducationalInstitution: {
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
      University: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-graduation-cap',
          code: '\uf19d',
          size: 50,
          color: 'Navy'
        }
      },
      College: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-graduation-cap',
          code: '\uf19d',
          size: 50,
          color: 'Blue'
        }
      },
      Community_college: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-graduation-cap',
          code: '\uf19d',
          size: 50,
          color: 'Blue'
        }
      },
      Library: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          code: '\uf19c',
          size: 45,
          color: 'brown'
        }
      },
      
      
      
      Person: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          code: '\uf007',
          size: 50,
          color: 'Crimson'
        }
      },
      BusinessPerson: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          code: '\uf007',
          size: 50,
          color: 'IndianRed'
        }
      },
      Politician: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          code: '\uf007',
          size: 50,
          color: 'DarkSalmon'
        }
      },
      OfficeHolder: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          code: '\uf007',
          size: 50,
          color: 'LightSalmon'
        }
      },
      OrganisationMember: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          code: '\uf007',
          size: 50,
          color: 'Magenta'
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
      OrganizationalUnit: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-users',
          code: '\uf0c0',
          size: 45,
          color: 'Teal'
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
          color: 'SaddleBrown'
        }
      },
      GovernmentAgency: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-building',
          code: '\uf1ad',
          size: 45,
          color: 'Sienna'
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
          color: 'YellowGreen'
        }
      },
      NonProfitOrganisation: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-users',
          code: '\uf0c0',
          size: 50,
          color: 'ForestGreen'
        }
      },
      NGO: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-users',
          code: '\uf0c0',
          size: 50,
          color: 'SpringGreen'
        }
      },
      Faith: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          code: '\uf004',
          size: 40,
          color: 'Chocolate'
        }
      },
      ReligiousOrganisation: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          code: '\uf004',
          size: 40,
          color: 'DarkGoldenrod'
        }
      },
      State: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-map-marker ',
          code: '\uf041',
          size: 60,
          color: 'Indigo'
        }
      },
      Region: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-map-marker ',
          code: '\uf041',
          size: 60,
          color: 'Indigo'
        }
      },
      City: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-map-marker ',
          code: '\uf041',
          size: 60,
          color: 'DarkSlateGray'
        }
      },
      Village: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-map-marker ',
          code: '\uf041',
          size: 50,
          color: 'Gray'
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
          color: 'BlueViolet'
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
          color: 'LimeGreen'
        }
      },
     
      
      Strategy: {
        shape: 'icon',
        icon: {
          name: 'fa-bullseye',
          face: 'FontAwesome',
          code: '\uf140',
          size: 40,
          color: 'olive'
        }
      },

      Project: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-pencil',
          code: '\uf040',
          size: 40,
          color: 'maroon'
        }
      },
      
      Measure: {
        shape: 'icon',
        icon: {
          name: 'fa-line-chart',
          face: 'FontAwesome',
          code: '\uf201',
          size: 40,
          color: 'cyan'
        }
      },
      
      MeasureGreen: {
        shape: 'icon',
        icon: {
          name: 'fa-bullseye',
          face: 'FontAwesome',
          code: '\uf140',
          size: 40,
          color: 'green'
        }
      },
      MeasureRed: {
        shape: 'icon',
        icon: {
          name: 'fa-bullseye',
          face: 'FontAwesome',
          code: '\uf140',
          size: 40,
          color: 'red'
        }
      },
      MeasureYellow: {
        shape: 'icon',
        icon: {
          name: 'fa-bullseye',
          face: 'FontAwesome',
          code: '\uf140',
          size: 40,
          color: 'yellow'
        }
      },
      MeasureOrange: {
        shape: 'icon',
        icon: {
          name: 'fa-bullseye',
          face: 'FontAwesome',
          code: '\uf140',
          size: 40,
          color: 'orange'
        }
      },
      
      Scorecard: {
        shape: 'icon',
        icon: {
          name: 'fa-snowflake-o',
          face: 'FontAwesome',
          code: '\uf2dc',
          size: 40,
          color: 'cyan'
        }
      },
      ScorecardGreen: {
        shape: 'icon',
        icon: {
          name: 'fa-snowflake-o',
          face: 'FontAwesome',
          code: '\uf2dc',
          size: 40,
          color: 'green'
        }
      },
      ScorecardYellow: {
        shape: 'icon',
        icon: {
          name: 'fa-snowflake-o',
          face: 'FontAwesome',
          code: '\uf2dc',
          size: 40,
          color: 'yellow'
        }
      },
      ScorecardOrange: {
        shape: 'icon',
        icon: {
          name: 'fa-snowflake-o',
          face: 'FontAwesome',
          code: '\uf2dc',
          size: 40,
          color: 'orange'
        }
      },
      ScorecardRed: {
        shape: 'icon',
        icon: {
          name: 'fa-snowflake-o',
          face: 'FontAwesome',
          code: '\uf2dc',
          size: 40,
          color: 'red'
        }
      },
      
linechart: {
        shape: 'icon',
        icon: {
          name: 'fa-line-chart',
          face: 'FontAwesome',
          code: '\uf201',
          size: 40,
          color: 'cyan'
        }
      },
areachart: {
        shape: 'icon',
        icon: {
          name: 'fa-area-chart',
          face: 'FontAwesome',
          code: '\uf1fe',
          size: 40,
          color: 'cyan'
        }
      },
barchart: {
        shape: 'icon',
        icon: {
          name: 'fa-bar-chart',
          face: 'FontAwesome',
          code: '\uf080',
          size: 40,
          color: 'cyan'
        }
      },
piechart: {
        shape: 'icon',
        icon: {
          name: 'fa-pie-chart',
          face: 'FontAwesome',
          code: '\uf200',
          size: 40,
          color: 'cyan'
        }
      },
      
      Certificate: {
        shape: 'icon',
        icon: {
          name: 'fa-certificat',
          face: 'FontAwesome',
          code: '\uf0a3',
          size: 40,
          color: 'cyan'
        }
      },

      Crosshairs: {
        shape: 'icon',
        icon: {
          name: 'fa-crosshairs',
          face: 'FontAwesome',
          code: '\uf05b',
          size: 40,
          color: 'cyan'
        }
      },
      
      Comment: {
        shape: 'icon',
        icon: {
          name: 'fa-comment-o',
          face: 'FontAwesome',
          code: '\uf0e5 ',
          size: 40,
          color: 'cyan'
        }
      },
  
      Segment: {
        shape: 'icon',
        icon: {
          name: 'fa-pie-chart',
          face: 'FontAwesome',
          code: '\uf200',
          size: 40,
          color: 'DeepPink'
        }
      },
      
      Spoke: {
        shape: 'icon',
        icon: {
          name: 'fa-bullseye',
          face: 'FontAwesome',
          code: '\uf140',
          size: 40,
          color: 'HotPink'
        }
      },
      
     Piechart: {
        shape: 'icon',
        icon: {
          name: 'fa-pie-chart',
          face: 'FontAwesome',
          code: '\uf200',
          size: 40,
          color: 'DeepPink'
        }
      },
      
    
      Perse: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-cubes',
          code: '\uf1b3',
          size: 50,
          color: 'DarkOrange'
        }
      },
      
      Personality: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-puzzle-piece',
          code: '\uf12e',
          size: 45,
          color: 'Pink'
        }
      },
      PersonalityType: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tags',
          code: '\uf02c',
          size: 42,
          color: 'LightPink'
        }
      },
      PersonalityType_profile: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 38,
          color: 'HotPink'
        }
      },
      SST: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tags',
          code: '\uf02c',
          size: 40,
          color: 'LightPink'
        }
      },
      SST_profile: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 40,
          color: 'HotPink'
        }
      },
      SST_facet: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 40,
          color: 'DeepPink'
        }
      },
      Traxion: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tags',
          code: '\uf02c',
          size: 40,
          color: 'LightPink'
        }
      },
      Traxion_profile: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 40,
          color: 'HotPink'
        }
      },
      Traxion_facet: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 35,
          color: 'DeepPink'
        }
      },
      
      KTS: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tags',
          code: '\uf02c',
          size: 40,
          color: 'LightPink'
        }
      },
      KTS_profile: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 40,
          color: 'HotPink'
        }
      },
      KTS_facet: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 35,
          color: 'DeepPink'
        }
      },
      DiSC: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tags',
          code: '\uf02c',
          size: 40,
          color: 'LightPink'
        }
      },
      DiSC_profile: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-folder-open-o',
          code: '\uf115',
          size: 45,
          color: 'HotPink'
        }
      },
      DiSC_facet: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-file-text-o',
          code: '\uf0f6',
          size: 40,
          color: 'DeepPink'
        }
      },
      Watson: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tags',
          code: '\uf02c',
          size: 40,
          color: 'LightPink'
        }
      },
      Watson_profile: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 40,
          color: 'HotPink'
        }
      },
      Watson_facet: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 35,
          color: 'DeepPink'
        }
      },
      
      Geography: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-binoculars',
          code: '\uf1e5',
          size: 45,
          color: 'DarkOliveGreen'
        }
      },
      
      Demography: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-folder',
          code: '\uf07b',
          size: 45,
          color: 'RoyalBlue'
        }
      },
      DemographyType: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-folder-open-o',
          code: '\uf115',
          size: 45,
          color: 'CornflowerBlue'
        }
      },
      DemographyType_profile: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-hand-rock-o',
          code: '\uf255',
          size: 42,
          color: 'DodgerBlue'
        }
      },
      DemographyType_facet: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-thumbs-up',
          code: '\uf164',
          size: 38,
          color: 'LightSteelBlue'
        }
      },
      Card: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-id-badge',
          code: '\uf2c1',
          size: 50,
          color: 'LightSteelBlue'
        }
      },
      VCard: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-th-list ',
          code: '\uf00b',
          size: 45,
          color: 'LightSteelBlue'
        }
      },
      MBTI: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-folder-open-o',
          code: '\uf115',
          size: 45,
          color: 'CornflowerBlue'
        }
      },
      MBTI_profile: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-file-text-o',
          code: '\uf0f6',
          size: 40,
          color: 'DodgerBlue'
        }
      },
      Personicx: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tags',
          code: '\uf02c',
          size: 40,
          color: 'LightPink'
        }
      },
      Personicx_cluster: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 40,
          color: 'HotPink'
        }
      },
      Personicx_facet: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 35,
          color: 'DeepPink'
        }
      },
      
      Interest: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-search',
          code: '\uf002',
          size: 50,
          color: 'MediumTurquoise'
        }
      },
      InterestType: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tags',
          code: '\uf02c',
          size: 45,
          color: 'Turquoise'
        }
      },
      Interest_profile: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 40,
          color: 'DarkTurquoise'
        }
      },
      
      
      Skills: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tags',
          code: '\uf02c',
          size: 45,
          color: 'Sienna'
        }
      },
      Skill: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-laptop',
          code: '\uf109',
          size: 45,
          color: 'Peru'
        }
      },
      
      Knowledge: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-institution',
          code: '\uf19c',
          size: 45,
          color: 'Violet'
        }
      },
      KnowledgeType: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-magic',
          code: '\uf0d0',
          size: 45,
          color: 'Orchid'
        }
      },
      
      Experience: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-briefcase',
          code: '\uf0b1',
          size: 45,
          color: 'DarkOrchid'
        }
      },
      ExperienceType: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-cogs',
          code: '\uf085',
          size: 45,
          color: 'DarkViolet'
        }
      },

      Job: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-user',
          code: '\uf007',
          size: 40,
          color: 'Indigo'
        }
      },
      Volunteer: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
         code: '\uf21d',

          size: 40,
          color: 'DarkMagenta'
        }
      },
      
      
      OfferingOptions: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tags',
          code: '\uf02c',
          size: 45,
          color: 'BurlyWood'
        }
      },
      OfferingType: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 40,
          color: 'DarkGoldenrod'
        }
      },
      Offering: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 36,
          color: 'SaddleBrown'
        }
      },
      
      OpportunityOptions: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tags',
          code: '\uf02c',
          size: 45,
          color: 'Thistle'
        }
      },
      OpportunityType: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 40,
          color: 'Plum'
        }
      },
      Opportunity: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 36,
          color: 'Fuchsia'
        }
      },

      JobPosting: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-bullhorn',
          code: '\uf0a1',
          size: 40,
          color: 'DarkMagenta'
        }
      },
      VolunteerRole: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 40,
          color: 'DarkViolet'
        }
      },
     
      
      CampaignOptions: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tags',
          code: '\uf02c',
          size: 45,
          color: 'SlateGray'
        }
      },
      Segmentation: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 40,
          color: 'Silver'
        }
      },
      Personalization: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 40,
          color: 'Silver'
        }
      },
      Emotionalization: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-tag',
          code: '\uf02b',
          size: 40,
          color: 'Silver'
        }
      },
  			  
  		MatchMaker: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-magic',
          code: '\uf0d0',
          size: 55,
          color: 'Black'
        }
      },
      MatchMakercompress: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-compress',
          code: '\uf066',
          size: 40,
          color: 'Black'
        }
      },
      MatchMakermatch: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-link ',
          code: '\uf0c1',
          size: 36,
          color: 'MidnightBlue'
        }
      },
        MatchMakerconn: {
          shape: 'icon',
          icon: {
            face: 'FontAwesome',
            name: 'fa-connectdevelop',
            code: '\uf20e',
            size: 45,
            color: 'Black'
          }
        },

        
        
      Perspectives: {
  				shape: 'icon',
  				icon: {
  				  face: 'FontAwesome',
  				  code: '\uf1b3',
  				  size: 50,
  				  color: 'MidnightBlue'
  				}
  		},
      Perspective: {
  				shape: 'icon',
  				icon: {
  				  face: 'FontAwesome',
  				  code: '\uf1b2',
  				  size: 45,
  				  color: 'MidnightBlue'
  				}
  		},
  		Theme: {
  				shape: 'icon',
  				icon: {
  				  face: 'FontAwesome',
  				  code: '\uf12e',
  				  size: 40,
  				  color: 'DarkViolet'
  				}
  		},

      Measure: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          name: 'fa-line-chart',
          code: '\uf201',
          size: 40,
          color: 'blue'
        }
      },
      Objective: {
        shape: 'icon',
        icon: {
          name: 'fa-bullseye',
          face: 'FontAwesome',
          code: '\uf140',
          size: 40,
          color: 'green'
        }
      },
      Initiative: {
        shape: 'icon',
        icon: {
  				  face: 'FontAwesome',
  				  code: '\uf02c',
  				  size: 40,
  				  color: 'cyan'
        }
      },
      Task: {
        shape: 'icon',
        icon: {
  				  face: 'FontAwesome',
  				  code: '\uf02b',
  				  size: 40,
  				  color: 'lime'
        }
      },
      Pyramid: {
  				shape: 'icon',
  				icon: {
  				  face: 'FontAwesome',
  				  code: '\uf12e',
  				  size: 40,
  				  color: 'yellow'
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
  	  }
    
  	} // end groups
	
  } // end return
      
};
