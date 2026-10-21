GENCCODE_ASSEMBLY_TYPE=-a gcc-darwin
SO=dylib
SOBJ=dylib
A=a
LIBPREFIX=lib
LIB_EXT_ORDER=.78.3.dylib
COMPILE=arm64-apple-darwin20.0.0-clang -DU_ALL_IMPLEMENTATION -DU_ATTRIBUTE_DEPRECATED= -D_FORTIFY_SOURCE=2 -DNDEBUG -isystem /Users/kosi/Desktop/Football Sim/b5bf2e54cb654f7b/include -mmacosx-version-min=12.1  -mmacosx-version-min=12.1    -ftree-vectorize -fPIC -fstack-protector-strong -O2 -pipe -isystem /Users/kosi/Desktop/Football Sim/b5bf2e54cb654f7b/include -fdebug-prefix-map=/Users/ec2-user/croot/icu_1782931767914/work=/usr/local/src/conda/icu-78.3 -fdebug-prefix-map=/Users/kosi/Desktop/Football Sim/b5bf2e54cb654f7b=/usr/local/src/conda-prefix -std=c11 -Wall -pedantic -Wshadow -Wpointer-arith -Wmissing-prototypes -Wwrite-strings   -fno-common -c
LIBFLAGS=-I/Users/kosi/Desktop/Football Sim/b5bf2e54cb654f7b/include  -dynamic
GENLIB=arm64-apple-darwin20.0.0-clang -dynamiclib -dynamic -ftree-vectorize -fPIC -fstack-protector-strong -O2 -pipe -isystem /Users/kosi/Desktop/Football Sim/b5bf2e54cb654f7b/include -fdebug-prefix-map=/Users/ec2-user/croot/icu_1782931767914/work=/usr/local/src/conda/icu-78.3 -fdebug-prefix-map=/Users/kosi/Desktop/Football Sim/b5bf2e54cb654f7b=/usr/local/src/conda-prefix -std=c11 -Wall -pedantic -Wshadow -Wpointer-arith -Wmissing-prototypes -Wwrite-strings   -Wl,-headerpad_max_install_names -Wl,-dead_strip_dylibs -Wl,-rpath,/Users/kosi/Desktop/Football Sim/b5bf2e54cb654f7b/lib -L/Users/kosi/Desktop/Football Sim/b5bf2e54cb654f7b/lib -Wl,-headerpad,0x1000  
LDICUDTFLAGS=
LD_SONAME=-Wl,-compatibility_version -Wl,78 -Wl,-current_version -Wl,78.3 -install_name  
RPATH_FLAGS=
BIR_LDFLAGS=
AR=arm64-apple-darwin20.0.0-ar
ARFLAGS=r -c
RANLIB=arm64-apple-darwin20.0.0-ranlib
INSTALL_CMD=/usr/bin/install -c
