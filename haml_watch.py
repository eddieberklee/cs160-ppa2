# haml_watch.py
# Windows Version

import sys, os, time

file_complete = raw_input('enter file name (*.haml): ')
filename = file_complete[:file_complete.find('.')]
haml_call = "haml " + filename + ".haml " + filename + ".html"
print haml_call
os.system(haml_call)
old_call = os.stat(file_complete)
while 1:
  time.sleep(1.5)
  current_call = os.stat(file_complete)
  if current_call != old_call:
    print 'Detected a change in ' + file_complete
    print haml_call
    os.system(haml_call)
    old_call = current_call
