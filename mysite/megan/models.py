from django.db import models
from django.contrib.auth.models import User
# Learner model to hold learner-specific data
# Learner model to hold learner-specific data
class Learner(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="learner")
    
    niveau = models.CharField(max_length=50, choices=[('débutant', 'Débutant'), ('intermédiaire', 'Intermédiaire'), ('avancé', 'Avancé')])
    preferences = models.JSONField(default=list,  blank=True)
    date_inscription = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return f"Learner: {self.user.username}"

# Course model to hold course data
class Course(models.Model):
    titre = models.CharField(max_length=200)
    description = models.TextField()
    niveau_difficulte = models.CharField(max_length=50, choices=[('débutant', 'Débutant'), ('intermédiaire', 'Intermédiaire'), ('avancé', 'Avancé')])
    date_creation = models.DateField(auto_now_add=True)
    image = models.CharField(max_length=255, null=True, blank=True)
    video = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.titre
    
# Progress model to track learner's progress in courses
class Progress(models.Model):
    learner = models.ForeignKey(Learner, on_delete=models.CASCADE, related_name='progress')
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='progress')
    progress_percentage = models.IntegerField(default=0)  # Progress in percentage (0-100)
    status = models.CharField(max_length=50, choices=[('en cours', 'En Cours'), ('terminé', 'Terminé'), ('échoué', 'Échoué')], default='en cours')
    date_updated = models.DateField(auto_now=True)  # Track last update date for progress
    
    def __str__(self):
        return f"Progress for {self.learner.user.username} in {self.course.titre} - {self.progress_percentage}%"


class Quiz(models.Model):
    course = models.OneToOneField(Course, on_delete=models.CASCADE, related_name="quiz")
    titre = models.CharField(max_length=200)
    date_creation = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Quiz for {self.course.titre}"


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="questions")
    texte_question = models.TextField()
    choix_1 = models.CharField(max_length=255)
    choix_2 = models.CharField(max_length=255)
    choix_3 = models.CharField(max_length=255)
    bonne_reponse = models.CharField(max_length=255)  # Doit être égal à choix_1, choix_2 ou choix_3

    def __str__(self):
        return f"Question: {self.texte_question} (Quiz: {self.quiz.titre})"
    
# Recommendation model to suggest content to learners
class Recommendation(models.Model):
    learner = models.ForeignKey(Learner, on_delete=models.CASCADE, related_name="recommendations")
    type_recommendation = models.CharField(max_length=50, choices=[('cours', 'Cours'), ('article', 'Article'), ('vidéo', 'Vidéo'), ('quiz', 'Quiz')])
    contenu = models.TextField()
    date_recommandation = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Recommandation pour {self.learner.username}"


