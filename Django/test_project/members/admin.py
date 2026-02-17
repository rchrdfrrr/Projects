from django.contrib import admin
from .models import Member

# Register your models here.
# admin.site.register(Member)

class MemberAdmin(admin.ModelAdmin):
    """ This class is used to control the fields to display in the admin page."""
    list_display = ('lastname', 'firstname', 'joined_date', 'phone')

admin.site.register(Member, MemberAdmin)