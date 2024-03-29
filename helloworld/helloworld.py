import os
import urllib
import webapp2
import cgi
import datetime
import json
import jinja2

from google.appengine.api import users
from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers
from google.appengine.ext import db

jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))



class UploadLink(webapp2.RequestHandler):
  def get(self):
    upload_url = blobstore.create_upload_url('/upload')
    rtn = {0: upload_url}
    rtn = json.dumps(rtn)
    self.response.out.write('%s' % rtn)

class MainHandler(webapp2.RequestHandler):
  def get(self):
    upload_url = blobstore.create_upload_url('/upload')

    template_values = {
        'upload_url': upload_url,
        }

    template = jinja_environment.get_template('index.html')
    self.response.out.write(template.render(template_values))
    
class MainPage(webapp2.RequestHandler):
    def get(self):
        guestbook_name=self.request.get('guestbook_name')

        greetings = db.GqlQuery("SELECT * "
                                "FROM Greeting "
                                "WHERE ANCESTOR IS :1 "
                                "ORDER BY date DESC LIMIT 10",
                                guestbook_key(guestbook_name))

        upload_url = blobstore.create_upload_url('/upload')

        template_values = {
            'upload_url': upload_url,
            }

        template = jinja_environment.get_template('index.html')
        self.response.out.write(template.render(template_values))
      

        
        
class DocumentHandler(webapp2.RequestHandler):
    def get(self, resource):
        if resource:
          param = resource.split('.')
        else:
          param = ['','filename']
        tagKey = param[0]
        sortOrderCandidate = ['date', 'filename', 'author']
        if len(param)>1:
          sortOrder = param[1]
          if sortOrder not in sortOrderCandidate:
              sortOrder = 'filename'
        else:
          sortOrder = 'filename'
          
        guestbook_name=self.request.get('guestbook_name')

        greetings = db.GqlQuery("SELECT * "
                                "FROM Greeting "
                                "WHERE ANCESTOR IS :1 "
                                "ORDER BY %s LIMIT 100" % sortOrder,
                                guestbook_key(guestbook_name))
        rtn = {}
        n = 0
        for greeting in greetings:
          if tagChecker(greeting.tags, tagKey):
            #matching tag found!
            dict = {}
            dict['filename'] = greeting.filename
            dict['author'] = greeting.author
            dict['tags'] = greeting.tags
            #dict['date'] = greeting.date
            dict['url'] = "/serve/%s" % greeting.file.key()
            rtn[n] = dict
            n = n+1
                
        rtn = json.dumps(rtn)
        self.response.out.write('%s' % rtn)
        
        
def tagChecker(tags, tagkeys):
  n = 0
  for c in range(0,len(tagkeys)):
    if tagkeys[c] in tags:
      n= n+1
  if n == len(tagkeys):
    return True
  else:
    return False
    
        
def guestbook_key(guestbook_name=None):
  """Constructs a Datastore key for a Guestbook entity with guestbook_name."""
  return db.Key.from_path('Guestbook', guestbook_name or 'default_guestbook')
  
  
class Guestbook(webapp2.RequestHandler):
  def post(self):
    # We set the same parent key on the 'Greeting' to ensure each greeting is in
    # the same entity group. Queries across the single entity group will be
    # consistent. However, the write rate to a single entity group should
    # be limited to ~1/second.
    guestbook_name = self.request.get('guestbook_name')
    greeting = Greeting(parent=guestbook_key(guestbook_name))

    if users.get_current_user():
      greeting.author = users.get_current_user().nickname()

    greeting.content = self.request.get('content')
    greeting.put()
    self.redirect('/?' + urllib.urlencode({'guestbook_name': guestbook_name}))
    
    
class Greeting(db.Model):
    """Models an individual Guestbook entry with an author, content, and date."""
    author = db.StringProperty()
    filename = db.StringProperty()
    date = db.DateTimeProperty(auto_now_add=True)
    tags = db.StringProperty(required=False)
    file = blobstore.BlobReferenceProperty(required=False)

class UploadHandler(blobstore_handlers.BlobstoreUploadHandler):
  def post(self):
    upload_files = self.get_uploads('file')  # 'file' is file upload field in the form
    blob_info = upload_files[0]
    
    guestbook_name = self.request.get('guestbook_name')
    greeting = Greeting(parent=guestbook_key(guestbook_name))

    greeting.author = self.request.get('author')
    greeting.content = self.request.get('content')
    greeting.tags = self.request.get('tags')
    greeting.file = blob_info
    greeting.filename = blob_info.filename
    if greeting.file:
      greeting.put()
      self.redirect('/?' + urllib.urlencode({'guestbook_name': guestbook_name}))


class ServeHandler(blobstore_handlers.BlobstoreDownloadHandler):
  def get(self, resource):
    resource = str(urllib.unquote(resource))
    blob_info = blobstore.BlobInfo.get(resource)
    self.send_blob(blob_info)
    
class ServeHandler2(blobstore_handlers.BlobstoreDownloadHandler):
  def get (self, resource):
    resource = str(urllib.unquote(resource))
    blob_info = blobstore.BlobInfo.get(resource)
    self.response.out.write('<html><body>hi<br>')
    self.response.out.write('<a href="/serve/%s"' % blob_info.key())
    self.response.out.write('>%s</a>' % blob_info.filename)
    self.response.out.write('</body></html>')
    
class ServeHandler3(blobstore_handlers.BlobstoreDownloadHandler):
  def get (self, resource):
    blobs = blobstore.BlobInfo.all()
    self.response.out.write('<html><body>')
    x = 0
    for blob_info in blobs:
      x=x+1
      self.response.out.write('%s: ' % x)
      self.response.out.write('<a href="/serve/%s"' % blob_info.key())
      self.response.out.write('>%s</a><br>' % blob_info.filename)
    self.response.out.write('size: %s' % x)
    self.response.out.write('<br><a href="/">To MainPage</a>')
    self.response.out.write('</body></html>')

app = webapp2.WSGIApplication([('/', MainPage),
                               ('/mainhandler', MainHandler),
                               ('/upload', UploadHandler),
                               ('/sign', Guestbook),
                               ('/upload_form_action', UploadLink),
                               ('/serve/([^/]+)?', ServeHandler),
                               ('/serve2/([^/]+)?', ServeHandler2),
                               ('/serve3/([^/]+)?', ServeHandler3),
                               ('/documents/([^/]+)?', DocumentHandler)],
                              debug=True)
