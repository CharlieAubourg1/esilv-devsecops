# Projet DevSecOps ESILV BIC A3 DCE 2025-2026

## Contexte

Dans un environnement de développement moderne, les conteneurs et l'orchestration sont devenus essentiels pour déployer et gérer des applications de manière flexible et évolutive. Docker permet de créer des images de conteneurs pour les différentes composantes d'une application, tandis que Kubernetes permet de les orchestrer pour les déployer à grande échelle. Ce projet vise à déployer une application web connectée à une base de données en utilisant Kubernetes, en mettant en place des Pods pour chaque composant et en configurant des services pour permettre la communication interne et externe.

## Objectifs

### Déployer une base de données (PostGreSQL ou MySQL) comme Pod

Créer un Pod Kubernetes pour déployer une base de données relationnelle. Configurer les paramètres de la base de données (nom de la BDD, utilisateur, mot de passe) en utilisant des Secrets et ConfigMaps pour une meilleure gestion des informations sensibles et de la configuration. Mettre en place un volume persistant (PersistentVolumeClaim) pour garantir la persistance des données même si le Pod est redémarré ou remplacé.

### Déployer une application web (NodeJS ou Django)

Conteneuriser une application web développée en NodeJS ou Django en utilisant Docker. Déployer cette application sur un Pod dans le cluster Kubernetes. Configurer les variables d’environnement nécessaires pour connecter l’application à la base de données.

### Créer un Service pour connecter l'application web à la base de données

Créer un Service de type ClusterIP pour la base de données, qui permettra à l’application web de se connecter à celle-ci de manière interne, sans exposer directement la base de données à l'extérieur. Configurer l’application pour utiliser ce Service, en définissant les informations de connexion (hôte, port, utilisateur, etc.) nécessaires pour accéder à la base de données.

### Exposer l'application web à l'extérieur du cluster via un Service de type NodePort ou LoadBalancer

Créer un Service de type NodePort ou LoadBalancer pour exposer l’application web à l’extérieur du cluster. Configurer les règles de routage et de sécurité nécessaires pour permettre l'accès à l’application à partir d’Internet tout en garantissant une communication sécurisée. Vérifier le bon fonctionnement de l’application en testant l'accès à partir de l'extérieur.

## Livrables

### Fichiers de Configuration Kubernetes (fichiers YAML)

- deployment.yaml pour le Pod PostgreSQL/MySQL
- deployment.yaml pour le Pod NodeJS/Django
- service-db.yaml pour le Service interne de la base de données
- service-web.yaml pour le Service exposant l'application web à l'extérieur

### Documentation

- Guide d’installation et de déploiement, expliquant les étapes pour construire et déployer les conteneurs, ainsi que pour déployer les fichiers YAML dans Kubernetes.
- Documentation des paramètres de configuration et des éventuelles modifications à apporter pour adapter le déploiement à d’autres environnements ou configurations spécifiques.

### Scripts et Code Source

- Code source de l’application web en NodeJS ou Django.
- Dockerfile pour la création de l'image de l’application web.
- Scripts d’initiation de la base de données, si nécessaire.

## Étapes du projet

### Phase de préparation

- Définir l’architecture de l’application et les ressources nécessaires.
- Rédiger les Dockerfiles pour conteneuriser l’application web et les scripts de base de données.
- Configurer l’environnement Kubernetes et Docker.

### Phase de développement

- Développer et tester l’application web.
- Créer et tester les images Docker des conteneurs de l’application web et de la base de données.

### Phase de déploiement

- Créer les fichiers YAML pour les Pods, Services, ConfigMaps, Secrets, et PersistentVolumeClaims.
- Déployer les Pods dans Kubernetes.
- Configurer les Services pour établir la connexion entre les composants de l’application et permettre l’accès externe.

### Phase de validation et test

- Vérifier que l’application web est accessible depuis l’extérieur du cluster via l'URL ou l’IP du Service.
- Tester les fonctionnalités de l’application web, notamment l’accès aux données.
- Effectuer des tests de résilience en redémarrant les Pods pour s'assurer de la persistance des données.

### Phase de documentation et livraison

- Finaliser la documentation, y compris un guide utilisateur et un guide de maintenance.
- Remettre les fichiers de configuration et le code source.

## Conclusion

Ce projet vous permettra d'acquérir une compréhension approfondie des technologies Docker et Kubernetes, ainsi que des compétences pratiques pour déployer et orchestrer des applications web conteneurisées. En complétant ce projet, vous serez capable de déployer une infrastructure basée sur des conteneurs avec une base de données et une application web interconnectées, tout en garantissant une bonne gestion de la sécurité et de la persistance des données.