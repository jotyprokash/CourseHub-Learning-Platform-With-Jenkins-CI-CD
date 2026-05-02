from diagrams import Diagram, Cluster, Edge
from diagrams.aws.compute import EC2, EKS
from diagrams.aws.network import Route53, ELB
from diagrams.aws.general import Users
from diagrams.aws.database import RDS
from diagrams.onprem.ci import Jenkins
from diagrams.onprem.container import Docker
from diagrams.onprem.monitoring import Prometheus, Grafana
from diagrams.onprem.vcs import Github
from diagrams.onprem.security import Trivy
from diagrams.k8s.compute import Pod
from diagrams.k8s.network import Service, Ingress
from diagrams.k8s.infra import Master
from diagrams.onprem.database import PostgreSQL
from diagrams.custom import Custom
import os

output_dir = os.path.dirname(os.path.abspath(__file__))
icon_dir = os.path.join(output_dir, "icons")

# Senior Architect's helper for uniform custom nodes
def get_node(name, icon_name, default_class):
    path = os.path.join(icon_dir, icon_name)
    if os.path.exists(path) and os.path.getsize(path) > 100:
        return Custom(name, path)
    return default_class(name)

graph_attr = {
    "fontsize": "32",
    "fontname": "Arial Bold",
    "bgcolor": "#FFFFFF",
    "pad": "1.5",
    "splines": "ortho",
    "nodesep": "1.0",
    "ranksep": "2.0",
    "dpi": "150",
    "compound": "true",
    "fontcolor": "#1F2937",
}

node_attr = {
    "fontname": "Arial",
    "fontsize": "12",
    "shape": "none",
    "height": "1.2",
    "width": "1.2",
}

edge_attr = {
    "penwidth": "2.0",
    "color": "#6366F1", # Indigo for a premium feel
}

with Diagram(
    "", # Clean title-less canvas
    filename=os.path.join(output_dir, "coursehub-architecture"),
    outformat="png",
    show=False,
    direction="LR",
    graph_attr=graph_attr,
    node_attr=node_attr,
    edge_attr=edge_attr,
):

    # External World
    source_code = Github("CourseHub Repo")
    end_users = Users("CourseHub Users")

    # AWS Cloud Infrastructure Wrapper
    with Cluster("AWS Cloud Ecosystem (Mumbai Region)", graph_attr={"bgcolor": "#F9FAFB", "pencolor": "#FF9900", "penwidth": "3", "style": "rounded"}):
        
        # Professional Entry Points
        dns = Route53("DNS Gateway")
        alb = ELB("Traffic Balancer")

        # Automation & DevSecOps Backbone
        with Cluster("DevSecOps Automation Center", graph_attr={"bgcolor": "#EFF6FF", "pencolor": "#2563EB"}):
            with Cluster("Jenkins Server (t2.large EC2)"):
                jenkins_ec2 = EC2("Automation Engine")
                # Connecting the Jenkins logic to the EC2 icon
                jenkins_icon = Jenkins("Jenkins Controller")
                jenkins_ec2 - jenkins_icon
            
            with Cluster("Shift-Left Security Hub", graph_attr={"bgcolor": "#FFF1F2", "pencolor": "#E11D48"}):
                docker_lint = get_node("Hadolint", "hadolint.png", PostgreSQL)
                k8s_lint = get_node("Kube-score", "kubescore.png", PostgreSQL)
                secrets_scan = get_node("Gitleaks", "gitleaks.png", PostgreSQL)
                semgrep_scan = get_node("Semgrep", "semgrep.png", PostgreSQL)
                sast_scan = get_node("SonarQube", "sonarqube.png", PostgreSQL)
                sca_scan = get_node("Snyk", "snyk.png", Trivy)
                iac_scan = get_node("Checkov", "Checkov.png", Trivy)
            
            docker_engine = Docker("Build Engine")
            image_scan = Trivy("Image Scanner")

            with Cluster("Supply Chain Integrity", graph_attr={"bgcolor": "#F0FDFA", "pencolor": "#0D9488"}):
                sbom_gen = get_node("Syft/Grype", "syft.png", Trivy)
                signing = get_node("Cosign", "cosign.png", PostgreSQL)

        # Management & Observability
        with Cluster("Security & Operations Hub", graph_attr={"bgcolor": "#F5F3FF", "pencolor": "#7C3AED"}):
            defect_dojo = get_node("DefectDojo", "defectdojo.png", PostgreSQL)
            secret_mgr = get_node("HashiCorp Vault", "vault.png", PostgreSQL)
            dast_scan = get_node("OWASP ZAP", "owasp_zap.png", Trivy)
            nuclei_scan = get_node("Nuclei", "nuclei.png", Trivy)
            metrics = Prometheus("Prometheus")
            viz = Grafana("Grafana")

        # Registries
        artifact_repo = Docker("Docker Hub")

        # Production Workloads
        with Cluster("Self-Managed Kubernetes Cluster", graph_attr={"bgcolor": "#F0FDF4", "pencolor": "#16A34A"}):
            
            with Cluster("K8s Worker Nodes (EC2)"):
                k8s_ec2 = EC2("EC2 Instances")
                api_gateway = Ingress("Ingress Controller")
                
                # Visually attach EC2 to the Ingress to indicate it hosts the cluster
                k8s_ec2 - api_gateway
                
                with Cluster("Workload Group"):
                    # Runtime Security
                    runtime_sec = get_node("Falco Security", "falco.png", PostgreSQL)
                    
                    with Cluster("Namespace: coursehub-prod"):
                        frontend = Pod("Web UI (Next.js)")
                        backend = Pod("API (Express)")
                        # Professional RDS Placement
                        database = RDS("Postgres DB")
                        
                        fe_svc = Service("UI Service")
                        be_svc = Service("API Service")

    # The Flow: Precise & Senior
    source_code >> Edge(label="1. Webhook", color="#2563EB") >> jenkins_ec2
    
    # Internal Pipeline Sequence
    jenkins_ec2 >> Edge(label="2. Pre-Build Scans", style="dashed", color="#E11D48") >> docker_lint
    docker_lint >> k8s_lint >> secrets_scan >> semgrep_scan >> sast_scan >> sca_scan >> iac_scan
    
    # Centralized Vulnerability Management (Senior Move)
    [sast_scan, sca_scan, iac_scan, image_scan] >> Edge(color="#7C3AED", style="dotted") >> defect_dojo
    
    iac_scan >> Edge(label="3. Artifact Build", color="#2563EB") >> docker_engine
    docker_engine >> Edge(label="4. Container Scan", color="#E11D48") >> image_scan
    image_scan >> sbom_gen >> Edge(label="5. Store & Sign", color="#2563EB") >> artifact_repo
    artifact_repo >> signing
    
    jenkins_ec2 >> Edge(label="6. CD Deploy", color="#16A34A", style="bold") >> api_gateway
    
    # Secrets & Security Integration
    secret_mgr >> Edge(label="Auth Tokens", style="dotted", color="#7C3AED") >> backend
    runtime_sec >> Edge(label="Protect", style="dotted", color="#E11D48") >> backend
    
    # User Traffic Flow
    end_users >> dns >> alb >> api_gateway
    api_gateway >> fe_svc >> frontend
    api_gateway >> be_svc >> backend
    backend >> database
    
    # Verification & Visibility
    fe_svc >> Edge(label="7. DAST Audit", color="#E11D48", style="dotted") >> dast_scan
    dast_scan >> nuclei_scan >> Edge(label="Aggregate", color="#7C3AED", style="dotted") >> defect_dojo
    backend >> Edge(style="dotted", color="#D97706") >> metrics
    metrics >> viz

print("Success: Senior-level DevSecOps Architecture finalized.")
