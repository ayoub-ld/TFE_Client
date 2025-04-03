
export default function Terms() {
  return (
    <>
    <div className="flex flex-col items-start justify-start gap-6 p-6 md:p-10">
    <h1>Conditions Générales d'Utilisation</h1>
    <p><em>Dernière mise à jour : [Date]</em></p>

    <section className="section">
        <h2 className="text-3xl">1. Acceptation des Conditions</h2>
        <p>En utilisant [Nom du Réseau Social], vous acceptez :</p>
        <ul>
            <li>Notre <a href="#">Politique de Confidentialité</a></li>
            <li>Ces CGU</li>
            <li>Notre <a href="#">Charte des Cookies</a></li>
        </ul>
    </section>

    <section className="section">
        <h2>2. Protection des Données (RGPD)</h2>
        
        <h3>a) Données Collectées</h3>
        <ul>
            <li><strong>Identité</strong>: Nom d'utilisateur, photo de profil</li>
            <li><strong>Authentification</strong>: Google ID</li>
            <li><strong>Contenu</strong>: Publications, images, hashtags</li>
        </ul>

        <h3>b) Finalités du Traitement</h3>
        <table>
            <tr>
                <th>Finalité</th>
                <th>Base Juridique</th>
            </tr>
            <tr>
                <td>Fourniture du service</td>
                <td>Exécution du contrat</td>
            </tr>
            <tr>
                <td>Personnalisation</td>
                <td>Consentement</td>
            </tr>
        </table>

        <h3>c) Vos Droits</h3>
        <ul>
            <li>Accès et rectification</li>
            <li>Suppression ("droit à l'oubli")</li>
            <li>Portabilité des données</li>
        </ul>
        <p>Contact : <a href="mailto:contact@example.com">contact@example.com</a></p>
    </section>

    <section className="section">
        <h2>3. Règles de Contenu</h2>
        <ul>
            <li><strong>Interdit</strong> : Harcèlement, discours haineux</li>
            <li>Signalement via <a href="#">ce formulaire</a></li>
        </ul>
    </section>

    <section className="section">
        <h2>4. Sécurité des Données</h2>
        <ul>
            <li>Chiffrement AES-256</li>
            <li>Sauvegardes quotidiennes</li>
        </ul>
    </section>    
    </div>
    </>
  )
}
