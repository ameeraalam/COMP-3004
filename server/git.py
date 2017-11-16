import os
import optparse

def git_commit(details):
	details = "'%s'" %(details)
	print('Adding changes...')
	os.system('sudo git add .')
	print('Committing changes')
	os.system('sudo git commit -m %s' %(details))
	print('Pushing changes...')
	os.system('sudo git push')
def main():
	parser = optparse.OptionParser('-m <commit>')
	parser.add_option('-m', dest = 'commit', type = 'string', help = 'commit description')
	(options, _) = parser.parse_args()
	if options.commit == None:
		print(parser.usage)
	else:
		git_commit(options.commit)
if __name__ == '__main__':
	main()
