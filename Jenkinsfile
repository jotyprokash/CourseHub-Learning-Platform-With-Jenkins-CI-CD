pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'jotyprokash/perkpoint'
        DOCKER_CREDENTIALS = credentials('docker-hub-credentials')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
            }
        }
        
        stage('Push Docker Image') {
            steps {
                sh "echo ${DOCKER_CREDENTIALS_PSW} | docker login -u ${DOCKER_CREDENTIALS_USR} --password-stdin"
                sh "docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}"
                sh "docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest"
                sh "docker push ${DOCKER_IMAGE}:latest"
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'echo "Deployment steps would go here"'
            }
        }
    }
    
    post {
        always {
            sh 'docker logout'
        }
    }
}