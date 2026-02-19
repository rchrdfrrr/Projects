from django.template import loader
from django.http import HttpResponse
from .models import Member

# Create your views here.
def members(request):
    mymembers = Member.objects.all().order_by('lastname').values()
    template = loader.get_template('all_members.html')
    context = {
        'mymembers': mymembers,
    }
    #return HttpResponse("Hello World! This is the members page.")
    # template = loader.get_template('myfirst.html')
    return HttpResponse(template.render(context, request))

# The members view does the following:

# Creates a mymembers object with all the values of the Member model.
# Loads the all_members.html template.
# Creates an object containing the mymembers object.
# Sends the object to the template.
# Outputs the HTML that is rendered by the template.

def details(request, id):
    mymember = Member.objects.get(id=id)
    template = loader.get_template('details.html')
    context = {
        'mymember': mymember,
    }
    return HttpResponse(template.render(context, request))

def main(request):
    template = loader.get_template('main.html')
    return HttpResponse(template.render())

def template(request):
    mymembers = Member.objects.all()
    template = loader.get_template('template.html')
    context = {
        'mymembers': mymembers,
    }
    return HttpResponse(template.render(context, request))

def testing(request):
    allmembers = Member.objects.all()
    somemembers = Member.objects.all().values_list('firstname', 'lastname')
    template = loader.get_template('testing.html')
    context = {
        'fruits' : ['apple', 'banana', 'cherry'],
        'allmember': allmembers,
        'somemember': somemembers,
    }
    return HttpResponse(template.render(context, request))