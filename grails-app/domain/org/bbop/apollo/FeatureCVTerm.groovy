package org.bbop.apollo

class FeatureCVTerm {

    static constraints = {
    }

    Integer featureCVTermId;
    Publication publication;
    Feature feature;
    CVTerm cvterm;
    boolean isNot;
    int rank;
//    Set<FeatureCVTermProperty> featureCVTermProperties = new HashSet<FeatureCVTermProperty>(0);
//    Set<FeatureCVTermPublication> featureCVTermPublications = new HashSet<FeatureCVTermPublication>(0);
//    Set<FeatureCVTermDBXref> featureCVTermDBXrefs = new HashSet<FeatureCVTermDBXref>(0);

    static hasMany = [
            featureCVTermProperties : FeatureCVTermProperty
            ,featureCVTermPublications: FeatureCVTermPublication
            ,featureCVTermDBXrefs: FeatureCVTermDBXref
    ]



    public boolean equals(Object other) {
        if ( (this == other ) ) return true;
        if ( (other == null ) ) return false;
        if ( !(other instanceof FeatureCVTerm) ) return false;
        FeatureCVTerm castOther = ( FeatureCVTerm ) other;

        return ( (this.getPublication()==castOther.getPublication()) || ( this.getPublication()!=null && castOther.getPublication()!=null && this.getPublication().equals(castOther.getPublication()) ) ) && ( (this.getFeature()==castOther.getFeature()) || ( this.getFeature()!=null && castOther.getFeature()!=null && this.getFeature().equals(castOther.getFeature()) ) ) && ( (this.getCvterm()==castOther.getCvterm()) || ( this.getCvterm()!=null && castOther.getCvterm()!=null && this.getCvterm().equals(castOther.getCvterm()) ) ) && (this.getRank()==castOther.getRank());
    }

    public int hashCode() {
        int result = 17;


        result = 37 * result + ( getPublication() == null ? 0 : this.getPublication().hashCode() );
        result = 37 * result + ( getFeature() == null ? 0 : this.getFeature().hashCode() );
        result = 37 * result + ( getCvterm() == null ? 0 : this.getCvterm().hashCode() );

        result = 37 * result + this.getRank();



        return result;
    }

    public FeatureCVTerm generateClone() {
        FeatureCVTerm cloned = new FeatureCVTerm();
        cloned.publication = this.publication;
        cloned.feature = this.feature;
        cloned.cvterm = this.cvterm;
        cloned.isNot = this.isNot;
        cloned.rank = this.rank;
        cloned.featureCVTermProperties = this.featureCVTermProperties;
        cloned.featureCVTermPublications = this.featureCVTermPublications;
        cloned.featureCVTermDBXrefs = this.featureCVTermDBXrefs;
        return cloned;
    }
}