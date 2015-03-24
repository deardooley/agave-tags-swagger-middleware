var apiPrefix				= 'http://localhost:8000',
		faker		 				= require('faker'),
		uuid		 				= require('uuid')
		swagger         = require('swagger-express-middleware'),
		Resource        = swagger.Resource,
		_dataset = [];

function AGAVE() {

	return {

		apis: [ 'apps','transfers','systems','jobs','tenants','transforms','usageTrigger','profiles','notifications','files','monitors','metadata','schemata', 'internalUsername', 'postits', 'monitorCheck' ],

		apps: function(resourceId) {
			return 'http://agave.iplantc.org/apps/v2/' + faker.lorem.sentence(1).replace(/ /g, '-') + '-1.1.3';
		},

		transfers: function(resourceId) {
			return 'http://agave.iplantc.org/transfers/v2/' + resourceId;
		},

		systems: function(resourceId) {
			return 'http://agave.iplantc.org/systems/v2/' + faker.lorem.sentence(1).replace(/ /g, '-');
		},

		jobs: function(resourceId) {
			return 'http://agave.iplantc.org/jobs/v2/' + resourceId;
		},

		tenants: function(resourceId) {
			return 'http://agave.iplantc.org/tenants/v2/' + resourceId;
		},

		transforms: function(resourceId) {
			return 'http://agave.iplantc.org/transforms/v2/' + resourceId;
		},

		usageTrigger: function(resourceId) {
			return 'http://agave.iplantc.org/usageTrigger/v2/' + resourceId;
		},

		profiles: function(resourceId) {
			return 'http://agave.iplantc.org/profiles/v2/' + faker.internet.userName();
		},

		notifications: function(resourceId) {
			return 'http://agave.iplantc.org/notifications/v2/' + resourceId;
		},

		files: function(resourceId) {
			return 'http://agave.iplantc.org/files/v2/media/system/' +
							faker.helpers.slugify(faker.lorem.sentence(3)) + '/' +
							faker.lorem.word() + '/' +
							faker.lorem.word() + '/' +
							faker.lorem.word() + '/' +
							faker.lorem.word() + '.jpg';
		},

		monitors: function(resourceId) {
			return 'http://agave.iplantc.org/monitors/v2/' + resourceId;
		},

		metadata: function(resourceId) {
			return 'http://agave.iplantc.org/metadata/v2/' + resourceId;
		},

		schemata: function(resourceId) {
			return 'http://agave.iplantc.org/schemata/v2/' + resourceId;
		},

		internalUsername: function(resourceId) {
			return 'http://agave.iplantc.org/profiles/v2/' + faker.internet.userName() + '/internalUsername/' + faker.internet.userName();
		},

		postits: function(resourceId) {
			return 'http://agave.iplantc.org/postits/v2/' + faker.lorem.sentence(1).replace(/ /g, '-');
		},

		monitorCheck: function(resourceId) {
			return 'http://agave.iplantc.org/monitors/v2/' + resourceId + '/checks/' + resourceId;
		}

	};
};

var agave = AGAVE();

function MockDataset() {};

MockDataset.generate = function() {

	for (var i = 0; i<100; i++)
	{
	  // var tagId = uuid.v1();
		var tagId = i;
	  var tag = {
	    id: tagId,
	    name: faker.lorem.sentence(1,3),
	    created: faker.date.past(),
	    lastUpdated: faker.date.past(),
	    _links: {
	      self: {
	        href: apiPrefix + '/tags/' + tagId
	      },
				resources: {
	        href: apiPrefix + '/tags/' + tagId + '/resources'
	      },
				permissions: {
	        href: apiPrefix + '/tags/' + tagId + '/pems'
	      },
	      profile: {
	        href: 'https://agave.iplantc.org/profiles/v1/' + faker.internet.userName()
	      }
	    }
	  };

		_dataset.push(new Resource('/tags/' + tagId, tag));

	  for (var j = 0; j<faker.random.number(10); j++)
	  {
	    // var resourceId = uuid.v1();
	    var resourceId = j;
			var resourceType = 'files';//faker.random.array_element(agave.apis);
			var taggedResource = {
	      uuid: resourceId,
	      _links: {
	        self: {
						href: apiPrefix + '/tags/' + tagId + '/resources/' + resourceId,
	        },
					tag: {
						href: apiPrefix + '/tags/' + tagId,
		      }
	      }
	    };

			taggedResource._links[resourceType] = { href: agave[resourceType](resourceId) };

			_dataset.push(new Resource('/tags/' + tagId + '/resources/' + resourceId, taggedResource));
	  };

		for (var j = 0; j<faker.random.number(10); j++)
	  {
	    var uname = faker.internet.userName();

			_dataset.push(new Resource('/tags/' + tagId + '/pems/' + uname, {
	      username: uname,
	      permission: faker.random.array_element(['read','write','all','read_write','none']),
	      _links: {
	        self: {
	          href: apiPrefix + '/tags/' + tag.id + '/pems/' + uname
	        },
	        profile: {
	          href: agave.profiles(uname)
	        },
					tag: {
	          href: apiPrefix + '/tags/' + tag.id
	        }
	      }
	    }));
	  }
	}

	return _dataset;
};

module.exports = MockDataset;
