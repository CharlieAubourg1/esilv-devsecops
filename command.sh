kubectl
ls
git branch
git checkout -b alex_in_the_cloud  
kubectl apply -f deployment-db.yaml
kubectl config current-context
kubectl apply -f service-db.yaml
kubectl get pods
kubectl get pvc
kubectl get svc
kubectl exec -it mysql-pod -- mysql -u root -p
