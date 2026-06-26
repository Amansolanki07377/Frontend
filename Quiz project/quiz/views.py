from django.http import HttpResponse
from django.shortcuts import render
from .models import Question,User,Player

def home(request):
    return render(request, 'home.html')

def quiz (request):  
    questions = Question.objects.all()

    return render(request, 'quiz.html', {'questions': questions})

# Create your views here.
def result(request):
    questions = Question.objects.all()   

    score = 0
    total = 5
    
    if request.method == "POST":
        for q in questions:
            user_answer = request.POST.get(str(q.id))
            if user_answer == q.answer:
                score += 1

    return render(request, 'result.html', {'score': score, 'total':total})

def signup(request):
    if request.method == "POST":
        try:
            User.objects.get(email=request.POST['email'])
            msg = "Email already exists"
            return render(request, 'signup.html', {'msg': msg})
        except:
            if request.POST['password'] == request.POST['cpassword']:
                User.objects.create(
                    fname=request.POST['fname'],
                    lname=request.POST['lname'],
                    email=request.POST['email'],
                    password=request.POST['password'],
                    usertype=request.POST['usertype']
                )
                msg = "Account created successfully! Please login."
                return render(request, 'login.html', {'msg':'Account created successfully! Please login.'})
    else:
        return render(request, 'signup.html')

def login(request):
    if request.method == "POST":
        try:
            user = User.objects.get(email=request.POST['email'])
            if user.password == request.POST['password']:
                request.session['user'] = user.email
                return render(request, 'home.html', {'user': user})
            else:
                msg = "Incorrect Password"
                return render(request, 'login.html', {'msg': msg})
        except:
            msg = "Email not registered"
            return render(request, 'login.html', {'msg': msg})
    else:
        return render(request, 'login.html')
