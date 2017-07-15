import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp'


import '../imports/api/users'
import { Links } from '../imports/api/links'
import '../imports/startup/simple_schema_configuration'

Meteor.startup(() => {
WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1)
    const link = Links.findOne({ _id })

    if(link){
      res.statusCode = 302
      res.setHeader('Location', link.url)
      res.end()
      Meteor.call('links.trackVisit', _id)
    } else {
      next()
    }
  })
  // WebApp.connectHandlers.use((req, res, next) => {
  //   console.log('this is from my custom middleware')
  //   console.log(req.url, req.method, req.headers, req.query)
  //   //set HTTP status code
  //   // res.statusCode = 404
  //   //set HTTP headers
  //   // res.setHeader('my-custom-header', 'azertyuiop')
  //   //set HTTP body
  //   // res.write('<h1>this is my middleware at work!</h1>')
  //   //end HTTP request
  //   // res.end()
  //   next()
  // })
});
