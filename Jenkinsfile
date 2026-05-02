pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'jotyprokash'
        APP_NAME = 'coursehub'
        SCANNER_HOME = tool 'sonar-scanner'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/jotyprokash/CourseHub-Learning-Platform-With-Jenkins-CI-CD.git'
            }
        }

        stage('Static Analysis') {
            parallel {
                stage('SAST') {
                    steps { sh 'semgrep --config auto .' }
                }
                stage('Secrets Audit') {
                    steps { sh 'gitleaks detect --source . --verbose' }
                }
                stage('Linting') {
                    steps { 
                        sh 'hadolint backend/Dockerfile'
                        sh 'hadolint frontend/Dockerfile'
                    }
                }
            }
        }

        stage('Code Quality & Compliance') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        sh 'sonar-scanner -Dsonar.projectKey=coursehub'
                    }
                    sh 'checkov -d ./helm/coursehub'
                }
            }
        }

        stage('Build & Vulnerability Scan') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_REGISTRY}/${APP_NAME}-backend:${env.BUILD_NUMBER} ./backend"
                    sh "trivy image --severity HIGH,CRITICAL ${DOCKER_REGISTRY}/${APP_NAME}-backend:${env.BUILD_NUMBER}"
                    
                    sh "docker build -t ${DOCKER_REGISTRY}/${APP_NAME}-frontend:${env.BUILD_NUMBER} ./frontend"
                    sh "trivy image --severity HIGH,CRITICAL ${DOCKER_REGISTRY}/${APP_NAME}-frontend:${env.BUILD_NUMBER}"
                }
            }
        }

        stage('Registry Push') {
            steps {
                script {
                    docker.withRegistry('', 'docker-hub-credentials') {
                        sh "docker push ${DOCKER_REGISTRY}/${APP_NAME}-backend:${env.BUILD_NUMBER}"
                        sh "docker push ${DOCKER_REGISTRY}/${APP_NAME}-frontend:${env.BUILD_NUMBER}"
                        sh "docker tag ${DOCKER_REGISTRY}/${APP_NAME}-backend:${env.BUILD_NUMBER} ${DOCKER_REGISTRY}/${APP_NAME}-backend:latest"
                        sh "docker tag ${DOCKER_REGISTRY}/${APP_NAME}-frontend:${env.BUILD_NUMBER} ${DOCKER_REGISTRY}/${APP_NAME}-frontend:latest"
                        sh "docker push ${DOCKER_REGISTRY}/${APP_NAME}-backend:latest"
                        sh "docker push ${DOCKER_REGISTRY}/${APP_NAME}-frontend:latest"
                    }
                }
            }
        }

        stage('Helm Deployment') {
            steps {
                withKubeConfig([credentialsId: 'k8s-config']) {
                    sh "helm upgrade --install ${APP_NAME} ./helm/coursehub --set image.tag=${env.BUILD_NUMBER}"
                }
            }
        }

        stage('Dynamic Analysis') {
            steps {
                sh "zap-baseline.py -t http://coursehub.local -r zap_report.html"
            }
        }
    }
    
    post {
        always {
            cleanWs()
            archiveArtifacts artifacts: '*-report.*', allowEmptyArchive: true
        }
    }
}